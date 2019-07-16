export const onCreateOrUpdateOrDeleteHop = `subscription onCreateOrUpdateOrDeleteHop {
  onCreateHop {
    id
    name
    weightGrams
    yearHarvested
  },
  onUpdateHop {
    id
    name
    weightGrams
    yearHarvested
  },
  onDeleteHop {
    id
    name
    weightGrams
    yearHarvested
  }
}`;
