<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('servicos', function (Blueprint $table) {
            $table->id();
            $table->string("nome");
            $table->decimal("valor_minimo", 10, 2);
            $table->integer("quantidade_horas");
            $table->decimal("porcentagem");

            $table->decimal("valor_quarto", 10, 2);
            $table->integer("horas_quarto");

            $table->decimal("valor_sala", 10, 2);
            $table->integer("horas_sala");

            $table->decimal("valor_banheiro", 10, 2);
            $table->integer("horas_banheiro");

            $table->decimal("valor_cozinha", 10, 2);
            $table->integer("horas_cozinha");

            $table->decimal("valor_quintal", 10, 2);
            $table->integer("horas_quintal");

            $table->decimal("valor_outros", 10, 2);
            $table->integer("horas_outros");

            $table->string("icone");
            $table->integer("posicao");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('servicos');
    }
};
