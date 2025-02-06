import { Company } from "./Company";
import { CustomMap } from "./CustomMap";
import { User } from "./User";

const user = new User();
const company = new Company();
const customMap = new CustomMap("map");

customMap.addMarker(user);
customMap.addMarker(company);

// ts-node index.ts
// npx parcel index.html
// parcel converte seu arquivo TS em um JS compreensivel pelo navegador




