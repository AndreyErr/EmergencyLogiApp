import AuMenu from "./AuMenu";
import StoragePageLayout from "./storages/StoragePageLayout";
import IncidentPageLayout from "./incidents/IncidentPageLayout";
import PatternPageLayout from "./patterns/PatternPageLayout";
import AuUsers from "./users/AuUsers";
import Items from "./items/Items";
import MePage from "./users/MePage";
import ExternalLinkLayout from "./users/ExternalLinkLayout";
import Settings from "./settings/Settings";

function AuPageLayout(props){

    return(
      <main>
        <div className="container">
          <div className="pt-5 "></div>
        </div>
        <div className="container">
          <div className="row g-0">
            <div className="col-md-3">
                <AuMenu active={props.type}/>
            </div>
            <div className="col-md-9">
              <div>
                {props.type === 'storages' ? <StoragePageLayout type={props.type} /> : null}
                {props.type === 'incidents' ? <IncidentPageLayout type={props.type} /> : null}
                {props.type === 'items' ? <Items type={props.type} /> : null}
                {props.type === 'patterns' ? <PatternPageLayout type={props.type} /> : null}
                {props.type === 'users' ? <AuUsers type={props.type} /> : null}
                {props.type === 'me' ? <MePage type={props.type} /> : null}
                {props.type === 'links' ? <ExternalLinkLayout type={"all"} /> : null}
                {props.type === 'settings' ? <Settings type={"all"} /> : null}
               </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default AuPageLayout;