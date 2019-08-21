/* eslint-disable max-len */
'use strict';
const api = require('./common/api');

module.exports = async function (activity) {
  try {
    api.initialize(activity);

    const pagination = $.pagination(activity);
    const dateRange = $.dateRange(activity);

    const response = await api(`/server-status/open?page=${pagination.page}&pageSize=${pagination.pageSize}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);

    if ($.isErrorResponse(activity, response)) return;

    const items = response.body.Data.items;
    let downCount = 0;

    for (let i = 0; i < items.length; i++) {
      if (items[i].description === 'Not Responding') downCount++;
    }

    activity.Response.Data.items = items;

    if (parseInt(pagination.page) === 1) {
      activity.Response.Data.title = T(activity, 'Server Status');
      activity.Response.Data.link = '';
      activity.Response.Data.linkLabel = T(activity, 'All server statuses');
      activity.Response.Data.actionable = downCount > 0;

      if (downCount > 0) {
        activity.Response.Data.value = downCount;
        activity.Response.Data.date = response.body.Data.items[0].date;
        activity.Response.Data.color = 'blue';
        activity.Response.Data.description = downCount > 1 ? T(activity, '{0} servers are currently down.', downCount) : T(activity, '1 server is currently down.');
      } else {
        activity.Response.Data.description = T(activity, 'All servers are running.');
      }
    }
  } catch (error) {
    $.handleError(activity, error);
  }
};
