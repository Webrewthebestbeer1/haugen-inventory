import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation }  from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as customGraphqlSubscriptions from '../../graphql/custom/subscriptions';
import { AddHop, DeleteHop } from '../../components/InputFields';
import styles from './styles.module.css';

const Hop = (props) => (
  <div className={`${styles.hop} ${props.even ? styles.evenRow : ''}`}>
    <div>{props.hop.name}</div>
    <div>{props.hop.weightGrams}</div>
    <div>{props.hop.yearHarvested}</div>
    <div>
      <Connect mutation={graphqlOperation(mutations.deleteHop)}>
        {({mutation}) => (
          <DeleteHop onDelete={mutation} id={props.hop.id} />
        )}
      </Connect>
    </div>

  </div>
);

const Hops = () => (
  <div>
    <Connect mutation={graphqlOperation(mutations.createHop)}>
      {({mutation }) => (
        <AddHop onCreate={mutation} />
      )}
    </Connect>
    <Connect
      query={graphqlOperation(queries.listHops, { limit: 999 })}
      subscription={graphqlOperation(customGraphqlSubscriptions.onCreateOrUpdateOrDeleteHop)}
      onSubscriptionMsg={(prev, { onCreateHop, onUpdateHop, onDeleteHop }) => {
        if (onCreateHop) {
          prev.listHops.items.push(onCreateHop);
        }
        if (onUpdateHop) {
          prev.listHops.items[prev.listHops.items.findIndex(hop => hop.id === onUpdateHop.id)] = onUpdateHop;
        }
        if (onDeleteHop) {
          prev.listHops.items.splice(prev.listHops.items.findIndex(hop => hop.id === onDeleteHop.id), 1);
        }
        return prev; 
      }}
    >
      {({ data: { listHops }, loading, error }) => {
          if (error) return (<h3>Error</h3>);
          if (loading || !listHops) return (<h3>Loading...</h3>);
          console.log(listHops);
          return listHops.items.sort((a, b) => a.name.localeCompare(b.name)).map((hop, index) => (
            <Hop key={hop.id} hop={hop} even={index % 2 === 0} />
          ));
      }}
    </Connect>
  </div>
);

export default Hops;
