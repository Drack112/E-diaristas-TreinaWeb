<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ServicoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', [LoginController::class, "showLoginForm"]);

Auth::routes();

Route::middleware("auth")->group(function () {
    Route::resource("usuarios", UsuarioController::class);

    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::get("/servicos", [ServicoController::class, "index"])->name("servicos.index");
    Route::get("/servicos/create", [ServicoController::class, "create"])->name("servicos.create");
    Route::post("/servicos", [ServicoController::class, "store"])->name("servicos.store");
    Route::get("/servicos/{servico}/edit", [ServicoController::class, "edit"])->name("servicos.edit");
    Route::put("/servicos/{servico}", [ServicoController::class, "update"])->name("servicos.update");

});
