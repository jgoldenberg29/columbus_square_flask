export function convertToESTFormat(dateTimeString) {
    console.log("date time string", dateTimeString)
    // const dateTimeObject = new Date(dateTimeString);

    // // Format the time manually in Eastern Standard Time (EST)
    // const hours = dateTimeObject.getUTCHours();
    // const minutes = dateTimeObject.getUTCMinutes();
    // const period = hours < 12 ? 'AM' : 'PM';
    // const formattedHours = (hours % 12 || 12).toString()
    // const formattedMinutes = minutes.toString().padStart(2, '0');



    // return `${formattedHours}:${formattedMinutes} ${period}`;
  }

export function formatDate(inputDate) {
    const dateObject = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
  }
