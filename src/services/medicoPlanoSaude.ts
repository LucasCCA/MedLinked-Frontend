import { medlinked } from "@medlinked/api";

export function associateConvenio(idPlanoSaude: number, idMedico: number) {
  return medlinked.put(
    `plano-saude/medico/adiciona-planos-medico/${idMedico}`,
    {
      idsPlanosSaude: [idPlanoSaude],
    },
  );
}

export function removeConvenio(idPlanoSaude: number, idMedico: number) {
  return medlinked.put(
    // eslint-disable-next-line max-len
    `plano-saude/medico/update-medico-remove-plano/${idMedico}/${idPlanoSaude}`,
  );
}
