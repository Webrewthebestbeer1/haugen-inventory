// eslint-disable
// this is an auto generated file. This will be overwritten

export const getHop = `query GetHop($id: ID!) {
  getHop(id: $id) {
    id
    name
    weightGrams
    yearHarvested
  }
}
`;
export const listHops = `query ListHops($filter: ModelHopFilterInput, $limit: Int, $nextToken: String) {
  listHops(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      weightGrams
      yearHarvested
    }
    nextToken
  }
}
`;
export const getMalt = `query GetMalt($id: ID!) {
  getMalt(id: $id) {
    id
    name
    weightKilos
  }
}
`;
export const listMalts = `query ListMalts(
  $filter: ModelMaltFilterInput
  $limit: Int
  $nextToken: String
) {
  listMalts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      weightKilos
    }
    nextToken
  }
}
`;
