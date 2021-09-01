module.exports = [
  {
    name: 'gis',
    type: 'postgres',
    url: process.env.POSTGRES_DATABASE_URL_GIS,
    entities: [process.env.POSTGRES_ENTITIES_GIS],
  },
  {
    name: 'sansig',
    type: 'postgres',
    url: process.env.POSTGRES_DATABASE_URL_SANSIG,
    entities: [process.env.POSTGRES_ENTITIES_SANSIG],
  },
]
