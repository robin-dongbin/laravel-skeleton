<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\MediaRequest;
use App\Http\Resources\MediaResource;
use Dedoc\Scramble\Attributes\QueryParameter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MediaController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<MediaResource>>
     */
    #[QueryParameter('per_page', description: 'Number of items per page.', type: 'int', default: 15)]
    #[QueryParameter('page', description: 'Current page', type: 'int')]
    #[QueryParameter('sort', description: 'Field to sort by', type: 'string', default: '-id', example: 'created_at')]
    public function index(Request $request)
    {
        $medias = QueryBuilder::for(Media::class)
            ->allowedFilters([
                AllowedFilter::partial('filename'),
                AllowedFilter::exact('aggregate_type'),
            ])
            ->allowedSorts(['id', 'created_at'])
            ->defaultSort('-id')
            ->paginate($this->perPage($request));

        return MediaResource::collection($medias);
    }

    /**
     * @return MediaResource
     *
     * @throws ConfigurationException
     * @throws FileNotFoundException
     * @throws FileNotSupportedException
     * @throws FileSizeException
     * @throws InvalidHashException
     */
    public function store(MediaRequest $request)
    {
        $file = $request->file('file');
        $filename = hash_file('md5', $file);
        $directory = 'uploads';

        $uploader = MediaUploader::fromSource($file)
            ->useFilename($filename)
            ->toDirectory($directory)
            ->withAltAttribute($request->string('alt', $request->string('name')));

        $media = $uploader->upload();

        return MediaResource::make($media);
    }

    public function show(Media $medium)
    {
        return MediaResource::make($medium);
    }

    public function update(MediaRequest $request, Media $medium)
    {
        $medium->update($request->validated());

        return MediaResource::make($medium);
    }

    public function destroy(Media $medium)
    {
        $medium->delete();

        return response()->noContent();
    }
}
