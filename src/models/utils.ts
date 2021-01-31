import {
  getSolidDataset,
  createSolidDataset,
  saveSolidDatasetAt,
  SolidDataset,
} from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-browser";

export const getOrCreateDataset = async (
  iri: string,
  session: Session
): Promise<SolidDataset> => {
  let dataSet;
  try {
    dataSet = await getSolidDataset(iri, { fetch: session.fetch });
  } catch {
    dataSet = createSolidDataset();
    dataSet = await saveSolidDatasetAt(iri, dataSet, { fetch: session.fetch });
  }
  return dataSet;
};
