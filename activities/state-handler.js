'use strict';
module.exports = async (activity) => {
  try {
    const request = activity.Request.Data;
    if(!request.webhook_event_data) return;
    if (request.webhook_event_data.check_state_name != "Available") return;

    let entity = {};
    let collections = [];
    let date = new Date(request.webhook_event_data.request_start_time).toISOString();
    entity = {
      _type: request.organization_name,
      id: "" + request.organization_name,
      title: request.webhook_event_data.check_name,
      description: request.webhook_event_data.check_state_name,
      date: date,
    };
    let roles = activity.Context.connector.custom1.split(",").map(role => role.trim());
    collections.push({ name: "open", users: [], roles: roles, date: date });

    activity.Response.Data = { entity: entity, collections: collections };
  } catch (error) {
    $.handleError(activity, error);
  }
};
