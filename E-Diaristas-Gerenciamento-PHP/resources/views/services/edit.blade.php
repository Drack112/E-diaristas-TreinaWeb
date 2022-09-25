@extends('adminlte::page')

@section('title', 'Editar Serviço')

@section('content_header')
    <h1>Editar Serviço</h1>
@stop

@section('content')
    @include('_messages')
    <form action="{{ route('servicos.update', $servico) }}" method="post">
        @method('PUT')

        @include('services._form')
    </form>
@stop
