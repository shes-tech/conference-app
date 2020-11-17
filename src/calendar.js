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
    start: event.startTime.toDate(),
    end: event.endTime.toDate(),
    summary: event.title,
    location: event.tag,
    url: `https://conference.shestech.org/events/${event.id}`,
    description: `Palestrantes: ${event.speakers}\n\n${event.description}`,
  });

  console.log(calendar);
  downloadCalendar(calendar);
}

export {
  // eslint-disable-next-line import/prefer-default-export
  createCalendar,
};
