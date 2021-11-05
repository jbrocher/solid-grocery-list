import { rdf, solid, space } from "rdf-namespaces";

import {
  createSolidDataset,
  createThing,
  buildThing,
  saveSolidDatasetAt,
  setThing,
  getSolidDataset,
  getThingAll,
  getUrl,
  Thing,
  SolidDataset,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";

interface Resource {
  identifier: string;
  storage: string;
  iri: string;
}
export class ResourceManager {
  profile: Thing;
  publicTypeIndex: SolidDataset;
  resource: Resource;

  constructor(
    profile: Thing,
    publicTypeIndex: SolidDataset,
    resource: Resource
  ) {
    this.profile = profile;
    this.resource = resource;
    this.publicTypeIndex = publicTypeIndex;
  }
  makeRef(identifier: string) {
    const storage = getUrl(this.profile, space.storage);
    // Decide at what URL within the user's Pod the new Document should be stored:
    return `${storage}${this.resource.storage}#${identifier}`;
  }

  getBaseUrl() {
    const storage = getUrl(this.profile, space.storage);
    return `${storage}${this.resource.storage}`;
  }

  async createRessource(): Promise<SolidDataset> {
    const storage = getUrl(this.profile, space.storage);

    // Decide at what URL within the user's Pod the new Dataset should be stored:
    const ref = storage + this.resource.storage;

    // Create the new Dataset:
    let list = createSolidDataset();
    list = await saveSolidDatasetAt(ref, list, { fetch: fetch });

    // Store a reference to that Document in the public Type Index for `schema:TextDigitalDocument`:
    const typeRegistration = buildThing(
      createThing({
        name: this.resource.identifier,
      })
    )
      .addUrl(rdf.type, solid.TypeRegistration)
      .addUrl(solid.instance, ref)
      .addUrl(solid.forClass, this.resource.iri)
      .build();

    let publicTypeIndex = await getSolidDataset(
      getUrl(this.profile, solid.publicTypeIndex) as string
    );
    publicTypeIndex = setThing(publicTypeIndex, typeRegistration);
    console.log(publicTypeIndex);

    publicTypeIndex = await saveSolidDatasetAt(
      getUrl(this.profile, solid.publicTypeIndex) as string,
      publicTypeIndex,
      { fetch: fetch }
    );
    return list;
  }

  async getOrCreate(): Promise<SolidDataset> {
    const publicTypeIndex = await getSolidDataset(
      getUrl(this.profile, solid.publicTypeIndex) as string
    );
    const entry = getThingAll(publicTypeIndex).find(
      (thing) => getUrl(thing, solid.forClass) === this.resource.iri
    );

    if (entry == null) {
      return await this.createRessource();
    } else {
      const ressourceRef = getUrl(entry, solid.instance);
      if (ressourceRef) {
        const ressourceList = await getSolidDataset(ressourceRef, {
          fetch: fetch,
        });
        return ressourceList;
      } else {
        throw new Error("Invalid recipe list type registry");
      }
    }
  }
}

export default ResourceManager;
