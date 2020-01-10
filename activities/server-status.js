/* eslint-disable max-len */
'use strict';
const api = require('./common/api');

module.exports = async (activity) => {
  try {
    api.initialize(activity);

    const pagination = $.pagination(activity);
    const dateRange = $.dateRange(activity);

    const response = await api(`/server-status/open?page=${pagination.page}&pageSize=${pagination.pageSize}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);

    if ($.isErrorResponse(activity, response)) return;

    const items = response.body.Data.items;
    const serversDown = [];
    let downCount = 0;

    for (let i = 0; i < items.length; i++) {
      if (items[i].description === 'Not Responding') {
        downCount++;
        serversDown.push(items[i]);
      }
    }

    activity.Response.Data.items = items;

    if (parseInt(pagination.page) === 1) {
      activity.Response.Data.title = T(activity, 'Server Status');
      activity.Response.Data.link = 'https://app.freshping.io';
      activity.Response.Data.linkLabel = T(activity, 'Go to Freshping');
      activity.Response.Data.actionable = downCount > 0 || items.length === 0;

      if (downCount > 0) {
        activity.Response.Data.value = downCount;
        activity.Response.Data.date = response.body.Data.items[0].date;
        activity.Response.Data.color = 'red';
        activity.Response.Data.description = downCount > 1 ? T(activity, '{0} servers are currently down.', downCount) : T(activity, '1 server is currently down.');

        switch (downCount) {
        case 1:
          activity.Response.Data.briefing = T(activity, `Server <b>${serversDown[0].title}</b> is currently down.`);
          break;
        case 2:
          activity.Response.Data.briefing = T(activity, `Servers <b>${serversDown[0].title}</b> and <b>${serversDown[1].title}</b> are currently down.`);
          break;
        default:
          activity.Response.Data.briefing = T(activity, `Server <b>${serversDown[0].title}</b> and <b>${serversDown.length - 1}</b> more are currently down.`);
        }
      } else if (items.length > 0) {
        activity.Response.Data.description = T(activity, 'All servers are running.');
      } else {
        activity.Response.Data.description = T(activity, 'No server status information received.');
      }
    }
  } catch (error) {
    $.handleError(activity, error);
  }
};
