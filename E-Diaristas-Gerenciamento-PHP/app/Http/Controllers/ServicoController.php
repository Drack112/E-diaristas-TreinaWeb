<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServicoRequest;
use App\Models\Servico;

class ServicoController extends Controller
{
    public function index()
    {
        $servicos = Servico::paginate(10);

        return view("services.index", [
            "servicos" => $servicos,
        ]);
    }

    public function create()
    {
        return view("services.create");
    }

    public function store(ServicoRequest $request)
    {
        $dados = $request->except("_token");

        Servico::create($dados);

        return redirect()->route("servicos.index")->with("mensagem", "Serviço criado com sucesso!");

    }

    public function edit(Servico $servico)
    {
        Servico::findOrFail($servico);

        return view("services.edit", [
            'servico' => $servico,
        ]);
    }

    public function update(Servico $servico, ServicoRequest $request)
    {
        $dados = $request->except(["_token", "_method"]);

        $servico->update($dados);

        return redirect()->route("servicos.index")->with("mensagem", "Serviço atualizado com sucesso!");
    }
}
