/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zpcqhmbhezi9vhp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4xpsnhmc",
    "name": "ownerId",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zpcqhmbhezi9vhp")

  // remove
  collection.schema.removeField("4xpsnhmc")

  return dao.saveCollection(collection)
})
