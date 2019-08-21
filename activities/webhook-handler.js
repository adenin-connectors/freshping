'use strict';

module.exports = async (activity) => {
  try {
    const request = activity.Request.Data;

    if (!request.webhook_event_data) return;

    const date = new Date(request.webhook_event_data.request_start_time).toISOString();
    const roles = activity.Context.connector.custom2.split(',').map((role) => role.trim());

    const collections = [{
      name: 'open',
      users: [],
      roles: roles,
      date: date
    }];

    const entity = {
      _type: 'server-status',
      id: request.webhook_event_data.check_id,
      title: request.webhook_event_data.check_name,
      description: request.webhook_event_data.check_state_name,
      date: date,
      link: request.webhook_event_data.request_url
    };

    activity.Response.Data = {
      entity: entity,
      collections: collections
    };
  } catch (error) {
    $.handleError(activity, error);
  }
};
