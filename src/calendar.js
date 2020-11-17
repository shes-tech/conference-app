import ical from 'ical-generator';

function downloadCalendar(calendar) {
  // Create a link element
  const link = document.createElement('a');

  // Set link's href to point to the Blob URL
  link.href = calendar.toURL();
  link.download = 'shestech.ics';

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );

  // Remove link from body
  document.body.removeChild(link);
}

function createCalendar(event) {
  const calendar = ical({
    domain: 'shestech.org', name: "She'sTech Conference",
  });

  calendar.createEvent({
    start: event.startTime,
    end: event.endTime,
    summary: event.title,
    location: event.tag,
    url: `https://conference.shestech.org/events/${event.id}`,
    description: `Palestrantes: ${event.speakers}\n\n${event.description}`,
  });

  downloadCalendar(calendar);
}

function getCalendarUrl(event) {
  const finalEvent = ({
    start: event.startTime.toISOString().replace(/-|:|.000/g, ''),
    end: event.endTime.toISOString().replace(/-|:|.000/g, ''),
    summary: event.title.replace(/ /g, '+'),
    location: event.tag.replace(/ /g, '+'),
    url: `https://conference.shestech.org/events/${event.id}`,
  });

  let description = `Link: ${finalEvent.url}\n\n\n`
    + `Palestrantes: ${event.speakers}`
    + `\n\n${event.description}`;

  description = description.replace(/ /g, '+');
  description = description.replace(/\n/g, '<br>');
  finalEvent.description = description;

  const url = 'https://www.google.com/calendar/render?action=TEMPLATE'
    + `&text=${finalEvent.summary}`
    + `&dates=${finalEvent.start}/${finalEvent.end}`
    + `&sprop=${finalEvent.url}`
    + `&location=${finalEvent.location}`
    + `&details=${finalEvent.description}`
    + '&sf=true&output=xml';

  return url;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  createCalendar,
  getCalendarUrl,
};
