import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation }  from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as customGraphqlSubscriptions from '../../graphql/custom/subscriptions';
import { AddHop } from '../../components/InputFields';

const Hops = () => (
  <div>
    <Connect mutation={graphqlOperation(mutations.createHop)}>
      {({mutation }) => (
        <AddHop onCreate={mutation} />
      )}
    </Connect>
    <Connect
      query={graphqlOperation(queries.listHops)}
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
          return listHops.items.sort((a, b) => a.name.localeCompare(b.name)).map(hop => (
            <div key={hop.id}>
              {hop.name}
            </div>
          ));
      }}
    </Connect>
  </div>
);

export default Hops;
