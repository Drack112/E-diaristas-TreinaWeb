import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function useEncontrarDiarista() {
  const [cepAutomatico, setCepAutomatico] = useState(""),
    [coordenadas, setCoordenadas] = useState<{
      latitude: number;
      longitude: number;
    }>();

  useEffect(() => {
    (async () => {
      try {
        const gpsPermitido = await pedirPermissao();
        if (gpsPermitido) {
          setCoordenadas(await pegarCoordenadas());
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (coordenadas) {
          setCepAutomatico(await pegarCep());
        }
      } catch (error) {}
    })();
  }, [coordenadas]);

  async function pedirPermissao(): Promise<boolean> {
    try {
      // Perguntar pela permissão de geolocalização
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === "granted";
    } catch (error) {
      return false;
    }
  }

  async function pegarCoordenadas(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    // Pegar a posição de precisão mais alta
    const localizacao = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    // Retornar em coordenada, poderia ser tambem em timestamps
    return localizacao.coords;
  }

  async function pegarCep(): Promise<string> {
    if (coordenadas) {
      const endereco = await Location.reverseGeocodeAsync(coordenadas);
      // Se o endereço não existe, deixar vazio
      if (endereco.length > 0) {
        return endereco[0].postalCode || "";
      }
    }
    return "";
  }

  return {
    cepAutomatico,
  };
}
