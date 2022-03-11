export const ValidationService = {
	cep(cep = ""): boolean {
		// Remover tudo o que não for numero
		return cep.replace(/\D/g, "").length === 8
		// 34.567-99 --> 34556799
	},
}
