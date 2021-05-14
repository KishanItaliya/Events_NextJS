import EventItem from "./event-item";
import styles from "../../styles/event-list.module.css";

function EventList(props) {
  const { items } = props;

  return (
    <div className={styles.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </div>
  );
}

export default EventList;
