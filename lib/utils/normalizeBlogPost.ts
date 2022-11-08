// TODO: Need to type this, but haven't built a type for Pocketbase responses yet.
// will get more information on what the typings should be as I get closer to final.

function buildImage(item: any) {
  if (!item?.headerImage) return null;
  const host = process.env.NEXT_POCKETBASE_URL;
  const img = `${host}/api/files/${item["@collectionId"]}/${item?.id}/${item?.headerImage}`;
  return img;
}

// TODO: Need to type this, but haven't built a type for Pocketbase responses yet.
// will get more information on what the typings should be as I get closer to final.
export default function normalizeItem(item: any) {
  const obj = { ...item };
  obj.headerImageUrl = buildImage(item);
  return obj;
}