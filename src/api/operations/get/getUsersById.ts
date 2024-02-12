import { IncomingMessage, ServerResponse } from "http";
import { getIDFromUrl, returnErrorResponse } from "../../../utils/helpers/api";
import { RepsonseMessages } from "../../../types/enums";
import users from "../../../storage/Storage";

const getUserByID = async (req: IncomingMessage, res: ServerResponse) =>  {
  try {
    const id = getIDFromUrl(req);
    if (!id) {
      returnErrorResponse(res, 404, RepsonseMessages.InvalidId);
      return;
    }

    const user = users.getByID(id);
    if (!user) {
      returnErrorResponse(res, 400, RepsonseMessages.UserNotFound);
      return;
    }

    res.writeHead(200, {'Content-Type': 'application-json'});
    res.end(JSON.stringify(user));
  } catch (e) {
    returnErrorResponse(res, 500, RepsonseMessages.ServerError);
  }
}

export default getUserByID;