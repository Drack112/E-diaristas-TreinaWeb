@extends('adminlte::page')

@section('title', 'Novo Usuário')

@section('content_header')
    <h1>Novo Usuário</h1>
@stop

@section('content')
    @include('_messages')

    <form action="{{ route('usuarios.store') }}" method="post">
        @include('users._form')
    </form>
@stop
