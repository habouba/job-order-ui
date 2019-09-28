import { EntityMetadataMap, PropsFilterFnFactory } from "ngrx-data";

const entityMetadata: EntityMetadataMap = {
  Joborder: {
    filterFn: nameFilter, // optional
    sortComparer: sortByName, // optional
    selectId: jobOrderSelectId, //  a non-default function

    // Override default optimism/pessimism to the opposite of the defaults.
    // Pessimistic delete; optimistic add and update
    /* A dispatcher save command will add, delete, or update the collection before 
      sending a corresponding HTTP request (optimistic) or after (pessimistic). 
      The caller can specify in the optional isOptimistic parameter. 
      If the caller doesn't specify, the dispatcher chooses based on default options.

      The default defaults are the safe ones: 
      optimistic for delete and pessimistic for add and update. 
      You can override those choices here.
    */
    entityDispatcherOptions: {
      optimisticDelete: false,
      optimisticAdd: true,
      optimisticUpdate: true
    }
  }
};

// because the plural of "Joborder" is not "Joborders"
const pluralNames = { Joborder: "Joborders" };

export const entityConfig = {
  entityMetadata,
  pluralNames
};

// FILTERS AND SORTERS

// Can't embed these functions directly in the entityMetadata literal because
// AOT requires us to encapsulate the logic in wrapper functions

/** Filter for entities whose name matches the case-insensitive pattern */
export function nameFilter<T extends { name: string }>(
  entities: T[],
  pattern: string
) {
  return PropsFilterFnFactory(["name"])(entities, pattern);
}

/** Sort Comparer to sort the entity collection by its name property */
export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

/**
 * Returns the `id` property value as the primary key for any entity with an `id` property.
 * This function is a demonstration.
 * It isn't necessary because `id` is the primary key property by default.
 * But it would be necessary if key were other than `id`.
 */
export function jobOrderSelectId<T extends { id: any }>(entity: T) {
  return entity == null ? undefined : entity.id;
}
