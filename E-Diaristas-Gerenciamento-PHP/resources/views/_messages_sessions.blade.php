@if (session('mensagem'))
    <div class="alert alert-success">
        {{ session('mensagem') }}
    </div>
@endif
