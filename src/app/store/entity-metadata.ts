import { EntityMetadataMap } from "ngrx-data";

const entityMetadata: EntityMetadataMap = {
  Joborder: {}
};

// because the plural of "Joborder" is not "Joborders"
const pluralNames = { Joborder: "Joborders" };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
