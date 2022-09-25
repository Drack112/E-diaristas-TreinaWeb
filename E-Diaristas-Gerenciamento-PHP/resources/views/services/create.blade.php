@extends('adminlte::page')

@section('title', 'Dashboard')

@section('content_header')
    <h1>Novo Serviço</h1>
@stop

@section('content')
    @include('_messages')
    <form action="{{ route('servicos.store') }}" method="post">
        @include('services._form')
    </form>
@stop
