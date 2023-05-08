<?php

namespace App\Http\Resources;

use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ResponseCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection;
    }
}
