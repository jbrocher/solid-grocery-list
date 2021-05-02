import { rdf, solid, space } from "rdf-namespaces";
import {
  createDocument,
  fetchDocument,
  TripleSubject,
  TripleDocument,
} from "tripledoc";

interface Resource {
  identifier: string;
  storage: string;
  iri: string;
}
export class ResourceManager {
  profile: TripleSubject;
  publicTypeIndex: TripleDocument;
  resource: Resource;

  constructor(
    profile: TripleSubject,
    publicTypeIndex: TripleDocument,
    resource: Resource
  ) {
    this.profile = profile;
    this.resource = resource;
    this.publicTypeIndex = publicTypeIndex;
  }
  makeRef(identifier: string) {
    const storage = this.profile.getRef(space.storage);
    // Decide at what URL within the user's Pod the new Document should be stored:
    return `${storage}${this.resource.storage}#${identifier}`;
  }

  async createRessource(): Promise<TripleDocument> {
    const storage = this.profile.getRef(space.storage);

    // Decide at what URL within the user's Pod the new Document should be stored:
    const ref = storage + this.resource.storage;
    // Create the new Document:
    const list = createDocument(ref);
    list.save();

    // Store a reference to that Document in the public Type Index for `schema:TextDigitalDocument`:
    const typeRegistration = this.publicTypeIndex.addSubject({
      identifier: this.resource.identifier,
    });
    typeRegistration.addRef(rdf.type, solid.TypeRegistration);
    typeRegistration.addRef(solid.instance, list.asRef());
    typeRegistration.addRef(solid.forClass, this.resource.iri);
    return await this.publicTypeIndex.save([typeRegistration]);
  }

  async getOrCreate(): Promise<TripleDocument> {
    const entry = this.publicTypeIndex.findSubject(
      solid.forClass,
      this.resource.iri
    );

    if (entry == null) {
      return await this.createRessource();
    } else {
      const ressourceRef = entry.getRef(solid.instance);
      if (ressourceRef) {
        const ressourceList = await fetchDocument(ressourceRef);
        return ressourceList;
      } else {
        throw new Error("Invalid recipe list type registry");
      }
    }
  }
}

export default ResourceManager;
