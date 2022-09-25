<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{

    public function index()
    {
        $usuarios = User::paginate(15);

        return view("users.index", [
            "usuarios" => $usuarios,
        ]);
    }

    public function create()
    {
        return view("users.create");
    }

    public function store(UserRequest $request)
    {
        User::create([
            'name' => $request->name,
            "email" => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route("usuarios.index")->with("mensagem", "Usuário criado com sucesso!");
    }

    public function show($id)
    {
        dd("show");
    }

    public function edit(User $usuario)
    {
        return view("users.edit", [
            "usuario" => $usuario,
        ]);
    }

    public function update(UserRequest $request, User $usuario)
    {
        $usuario->update([
            'name' => $request->name,
            'email' => $request->name,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route("usuarios.index")->with("mensagem", "Usuário cadastrado com sucesso!");
    }

    public function destroy(User $usuario)
    {
        $usuario->delete();

        return redirect()->route("usuarios.index")->with("mensagem", "Usuário deletado com sucesso!");
    }
}
