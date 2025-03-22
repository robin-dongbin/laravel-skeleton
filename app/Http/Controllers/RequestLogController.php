<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestLogResource;
use App\Models\RequestLog;
use Illuminate\Http\Request;

class RequestLogController extends Controller
{
    public function index()
    {
        return RequestLogResource::collection(RequestLog::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([

        ]);

        return new RequestLogResource(RequestLog::create($data));
    }

    public function show(RequestLog $requestLog)
    {
        return new RequestLogResource($requestLog);
    }

    public function update(Request $request, RequestLog $requestLog)
    {
        $data = $request->validate([

        ]);

        $requestLog->update($data);

        return new RequestLogResource($requestLog);
    }

    public function destroy(RequestLog $requestLog)
    {
        $requestLog->delete();

        return response()->json();
    }
}
