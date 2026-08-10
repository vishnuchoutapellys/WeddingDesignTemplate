// Calendar utility to generate Google Calendar URLs and .ics downloadable files
import { weddingConfig } from '../config/weddingConfig';

export function generateGoogleCalendarUrl(
  title: string,
  details: string,
  location: string,
  startDateISO: string, // YYYYMMDDTHHmmss
  endDateISO: string
): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: details,
    location: location,
    dates: `${startDateISO}/${endDateISO}`
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadICSFile(
  title: string,
  description: string,
  location: string,
  startDateISO: string,
  endDateISO: string,
  filename: string = "wedding-event.ics"
) {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${weddingConfig ? weddingConfig.weddingDetails.title : 'Wedding'}//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `DTSTART:${startDateISO}Z`,
    `DTEND:${endDateISO}Z`,
    `STATUS:CONFIRMED`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
