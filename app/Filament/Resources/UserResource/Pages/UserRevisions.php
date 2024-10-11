<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Mansoor\FilamentVersionable\RevisionsPage;

class UserRevisions extends RevisionsPage
{
    protected static string $resource = UserResource::class;
}
