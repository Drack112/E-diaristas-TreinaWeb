@extends('adminlte::page')

@section('title', 'Lista de Serviços')

@section('content_header')
    <h1>Lista de Serviços</h1>
@stop

@section('content')

    @include('_messages_sessions')

    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">nome</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($servicos as $servico)
                <tr>
                    <th>{{ $servico->id }}</th>
                    <td>{{ $servico->nome }}</td>
                    <td>
                        <a href="{{ route('servicos.edit', $servico) }}" class="btn btn-primary">Atualizar</a>
                    </td>
                </tr>
            @empty
                <tr>
                    <th></th>
                    <th>Nenhum registro foi encontrado</th>
                    <th></th>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="d-flex justify-content-center">
        {{ $servicos->links() }}
    </div>

    <div class="float-right">
        <a href="{{ route('servicos.create') }}" class="btn btn-success">Novo Serviço</a>
    </div>
@stop
