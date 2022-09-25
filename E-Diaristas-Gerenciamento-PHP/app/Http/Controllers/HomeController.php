<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    /**
     * Cria uma nova instancia de Controller
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Exibe o Dashboard da aplicação
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
}
