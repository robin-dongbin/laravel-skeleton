<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\MediaRequest;
use App\Http\Resources\MediaResource;
use Dedoc\Scramble\Attributes\QueryParameter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Plank\Mediable\Exceptions\MediaUpload\ConfigurationException;
use Plank\Mediable\Exceptions\MediaUpload\FileExistsException;
use Plank\Mediable\Exceptions\MediaUpload\FileNotFoundException;
use Plank\Mediable\Exceptions\MediaUpload\FileNotSupportedException;
use Plank\Mediable\Exceptions\MediaUpload\FileSizeException;
use Plank\Mediable\Exceptions\MediaUpload\InvalidHashException;
use Plank\Mediable\Facades\MediaUploader;
use Plank\Mediable\Media;
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
                AllowedFilter::exact('path'),
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
     * @throws FileExistsException
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
            ->withAltAttribute($request->string('alt'));
        try {
            $media = $uploader->upload();

            return MediaResource::make($media);
        } catch (FileExistsException $e) {
            $media = Media::where('filename', $filename)->first();

            return MediaResource::make($media)->response()->setStatusCode(303);
        }
    }

    public function show(Media $media)
    {
        return MediaResource::make($media);
    }

    public function update(MediaRequest $request, Media $media)
    {
        $media->update($request->validated());

        return MediaResource::make($media);
    }

    public function destroy(Media $media)
    {
        $media->delete();

        return response()->noContent();
    }
}
