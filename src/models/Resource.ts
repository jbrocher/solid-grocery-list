import {
  SolidDataset,
  Thing,
  buildThing,
  createSolidDataset,
  createThing,
  getSolidDataset,
  getThingAll,
  getUrl,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { rdf, solid, space } from "rdf-namespaces";

interface Resource {
  identifier: string;
  storage: string;
  iri: string;
}
export class ResourceManager {
  profile: Thing;
  resource: Resource;
  _publicTypeIndex: SolidDataset | null;
  _dataSet: SolidDataset | null;

  constructor(profile: Thing, resource: Resource) {
    this.profile = profile;
    this.resource = resource;
    this._publicTypeIndex = null;
    this._dataSet = null;
  }

  async initialize() {
    this._dataSet = await this.getOrCreate();
  }

  async getPublicTypeIndex() {
    if (this._publicTypeIndex !== null) {
      return this._publicTypeIndex;
    }

    this._publicTypeIndex = await getSolidDataset(
      getUrl(this.profile, solid.publicTypeIndex) as string,
      { fetch: fetch }
    );
    return this._publicTypeIndex;
  }

  async savePublicTypeIndex(index: SolidDataset) {
    this._publicTypeIndex = await saveSolidDatasetAt(
      getUrl(this.profile, solid.publicTypeIndex) as string,
      index,
      { fetch: fetch }
    );
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

    let publicTypeIndex = await this.getPublicTypeIndex();
    publicTypeIndex = setThing(publicTypeIndex, typeRegistration);
    this.savePublicTypeIndex(publicTypeIndex);

    return list;
  }

  async getOrCreate(): Promise<SolidDataset> {
    const publicTypeIndex = await this.getPublicTypeIndex();
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
