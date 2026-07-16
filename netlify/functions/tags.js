const { findTag, createTag } = require("../../lib/tagsDb");

const headers = {
  "Content-Type": "application/json",
};

function getId(event) {
  const fromPath = event.path.split("/").filter(Boolean).pop();
  if (fromPath && fromPath !== "tags") return fromPath;
  return event.queryStringParameters?.id || null;
}

exports.handler = async (event) => {
  try {
    const id = getId(event);
    if (!id) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "missing_id" }) };
    }

    if (event.httpMethod === "GET") {
      const tag = await findTag(id);
      if (!tag) {
        return { statusCode: 404, headers, body: JSON.stringify({ error: "not_found" }) };
      }
      return { statusCode: 200, headers, body: JSON.stringify(tag) };
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const { ownerName, phone, petName } = body;
      if (!ownerName || !phone || !petName) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "missing_fields" }) };
      }

      const result = await createTag(id, { ownerName, phone, petName });
      if (result.conflict) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({ error: "already_registered", tag: result.tag }),
        };
      }
      return { statusCode: 201, headers, body: JSON.stringify(result.tag) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: "method_not_allowed" }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "server_error", message: err.message }) };
  }
};
