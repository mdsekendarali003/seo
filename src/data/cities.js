/**
 * Target metros. `slug` drives the URL: /computer-repair/dallas-tx
 *
 * Coordinates are real city-center values and are emitted into GeoCoordinates +
 * areaServed schema. `neighborhoods` matter more than they look: they are the
 * cheapest source of genuine on-page uniqueness, which is what stops 52 city
 * pages from being classified as doorway/scaled-content spam.
 */
export const CITIES = [
  { slug:'dallas-tx',        name:'Dallas',        state:'TX', stateName:'Texas',        lat:32.7767,  lng:-96.7970,  tz:'America/Chicago',   neighborhoods:['Uptown','Deep Ellum','Oak Lawn','Bishop Arts','Lake Highlands'] },
  { slug:'houston-tx',       name:'Houston',       state:'TX', stateName:'Texas',        lat:29.7604,  lng:-95.3698,  tz:'America/Chicago',   neighborhoods:['The Heights','Montrose','Midtown','Katy','Sugar Land'] },
  { slug:'los-angeles-ca',   name:'Los Angeles',   state:'CA', stateName:'California',   lat:34.0522,  lng:-118.2437, tz:'America/Los_Angeles', neighborhoods:['Downtown','Hollywood','Santa Monica','Sherman Oaks','Pasadena'] },
  { slug:'new-york-ny',      name:'New York',      state:'NY', stateName:'New York',     lat:40.7128,  lng:-74.0060,  tz:'America/New_York',  neighborhoods:['Manhattan','Brooklyn','Queens','The Bronx','Staten Island'] },
  { slug:'chicago-il',       name:'Chicago',       state:'IL', stateName:'Illinois',     lat:41.8781,  lng:-87.6298,  tz:'America/Chicago',   neighborhoods:['The Loop','Lincoln Park','Wicker Park','Hyde Park','Lakeview'] },
  { slug:'phoenix-az',       name:'Phoenix',       state:'AZ', stateName:'Arizona',      lat:33.4484,  lng:-112.0740, tz:'America/Phoenix',   neighborhoods:['Scottsdale','Tempe','Glendale','Arcadia','Ahwatukee'] },
  { slug:'philadelphia-pa',  name:'Philadelphia',  state:'PA', stateName:'Pennsylvania', lat:39.9526,  lng:-75.1652,  tz:'America/New_York',  neighborhoods:['Center City','Fishtown','University City','Manayunk','Northern Liberties'] },
  { slug:'san-antonio-tx',   name:'San Antonio',   state:'TX', stateName:'Texas',        lat:29.4241,  lng:-98.4936,  tz:'America/Chicago',   neighborhoods:['Alamo Heights','Stone Oak','Southtown','Medical Center','Helotes'] },
  { slug:'san-diego-ca',     name:'San Diego',     state:'CA', stateName:'California',   lat:32.7157,  lng:-117.1611, tz:'America/Los_Angeles', neighborhoods:['La Jolla','North Park','Pacific Beach','Chula Vista','Mission Valley'] },
  { slug:'austin-tx',        name:'Austin',        state:'TX', stateName:'Texas',        lat:30.2672,  lng:-97.7431,  tz:'America/Chicago',   neighborhoods:['Downtown','South Congress','East Austin','Round Rock','Cedar Park'] },
  { slug:'jacksonville-fl',  name:'Jacksonville',  state:'FL', stateName:'Florida',      lat:30.3322,  lng:-81.6557,  tz:'America/New_York',  neighborhoods:['Riverside','San Marco','Southside','Mandarin','Jacksonville Beach'] },
  { slug:'fort-worth-tx',    name:'Fort Worth',    state:'TX', stateName:'Texas',        lat:32.7555,  lng:-97.3308,  tz:'America/Chicago',   neighborhoods:['Sundance Square','TCU','Alliance','Keller','Arlington Heights'] },
  { slug:'columbus-oh',      name:'Columbus',      state:'OH', stateName:'Ohio',         lat:39.9612,  lng:-82.9988,  tz:'America/New_York',  neighborhoods:['Short North','German Village','Dublin','Westerville','Clintonville'] },
  { slug:'charlotte-nc',     name:'Charlotte',     state:'NC', stateName:'North Carolina', lat:35.2271, lng:-80.8431, tz:'America/New_York',  neighborhoods:['Uptown','South End','Ballantyne','NoDa','Matthews'] },
  { slug:'san-francisco-ca', name:'San Francisco', state:'CA', stateName:'California',   lat:37.7749,  lng:-122.4194, tz:'America/Los_Angeles', neighborhoods:['SoMa','Mission','Marina','Sunset','Financial District'] },
  { slug:'indianapolis-in',  name:'Indianapolis',  state:'IN', stateName:'Indiana',      lat:39.7684,  lng:-86.1581,  tz:'America/New_York',  neighborhoods:['Broad Ripple','Fountain Square','Carmel','Fishers','Mass Ave'] },
  { slug:'seattle-wa',       name:'Seattle',       state:'WA', stateName:'Washington',   lat:47.6062,  lng:-122.3321, tz:'America/Los_Angeles', neighborhoods:['Capitol Hill','Ballard','Fremont','Bellevue','Queen Anne'] },
  { slug:'denver-co',        name:'Denver',        state:'CO', stateName:'Colorado',     lat:39.7392,  lng:-104.9903, tz:'America/Denver',    neighborhoods:['LoDo','RiNo','Cherry Creek','Highlands','Aurora'] },
  { slug:'washington-dc',    name:'Washington',    state:'DC', stateName:'District of Columbia', lat:38.9072, lng:-77.0369, tz:'America/New_York', neighborhoods:['Capitol Hill','Georgetown','Dupont Circle','Navy Yard','Arlington'] },
  { slug:'nashville-tn',     name:'Nashville',     state:'TN', stateName:'Tennessee',    lat:36.1627,  lng:-86.7816,  tz:'America/Chicago',   neighborhoods:['The Gulch','East Nashville','Green Hills','Franklin','Germantown'] },
  { slug:'oklahoma-city-ok', name:'Oklahoma City', state:'OK', stateName:'Oklahoma',     lat:35.4676,  lng:-97.5164,  tz:'America/Chicago',   neighborhoods:['Bricktown','Midtown','Edmond','Norman','Nichols Hills'] },
  { slug:'el-paso-tx',       name:'El Paso',       state:'TX', stateName:'Texas',        lat:31.7619,  lng:-106.4850, tz:'America/Denver',    neighborhoods:['Downtown','West Side','East Side','Sunland Park','Horizon City'] },
  { slug:'boston-ma',        name:'Boston',        state:'MA', stateName:'Massachusetts', lat:42.3601, lng:-71.0589,  tz:'America/New_York',  neighborhoods:['Back Bay','South End','Cambridge','Somerville','Seaport'] },
  { slug:'portland-or',      name:'Portland',      state:'OR', stateName:'Oregon',       lat:45.5152,  lng:-122.6784, tz:'America/Los_Angeles', neighborhoods:['Pearl District','Hawthorne','Alberta','Beaverton','Sellwood'] },
  { slug:'las-vegas-nv',     name:'Las Vegas',     state:'NV', stateName:'Nevada',       lat:36.1699,  lng:-115.1398, tz:'America/Los_Angeles', neighborhoods:['The Strip','Summerlin','Henderson','Downtown','Spring Valley'] },
  { slug:'detroit-mi',       name:'Detroit',       state:'MI', stateName:'Michigan',     lat:42.3314,  lng:-83.0458,  tz:'America/New_York',  neighborhoods:['Midtown','Corktown','Royal Oak','Dearborn','Ferndale'] },
  { slug:'memphis-tn',       name:'Memphis',       state:'TN', stateName:'Tennessee',    lat:35.1495,  lng:-90.0490,  tz:'America/Chicago',   neighborhoods:['Downtown','Midtown','Germantown','Collierville','Cordova'] },
  { slug:'louisville-ky',    name:'Louisville',    state:'KY', stateName:'Kentucky',     lat:38.2527,  lng:-85.7585,  tz:'America/New_York',  neighborhoods:['NuLu','Highlands','St. Matthews','Jeffersontown','Old Louisville'] },
  { slug:'baltimore-md',     name:'Baltimore',     state:'MD', stateName:'Maryland',     lat:39.2904,  lng:-76.6122,  tz:'America/New_York',  neighborhoods:['Inner Harbor','Fells Point','Canton','Hampden','Towson'] },
  { slug:'milwaukee-wi',     name:'Milwaukee',     state:'WI', stateName:'Wisconsin',    lat:43.0389,  lng:-87.9065,  tz:'America/Chicago',   neighborhoods:['Third Ward','Bay View','Wauwatosa','Brookfield','Riverwest'] },
  { slug:'albuquerque-nm',   name:'Albuquerque',   state:'NM', stateName:'New Mexico',   lat:35.0844,  lng:-106.6504, tz:'America/Denver',    neighborhoods:['Nob Hill','Old Town','Rio Rancho','North Valley','Downtown'] },
  { slug:'tucson-az',        name:'Tucson',        state:'AZ', stateName:'Arizona',      lat:32.2226,  lng:-110.9747, tz:'America/Phoenix',   neighborhoods:['Downtown','Catalina Foothills','Oro Valley','Marana','Sam Hughes'] },
  { slug:'fresno-ca',        name:'Fresno',        state:'CA', stateName:'California',   lat:36.7378,  lng:-119.7871, tz:'America/Los_Angeles', neighborhoods:['Tower District','Clovis','Woodward Park','Fig Garden','Sunnyside'] },
  { slug:'sacramento-ca',    name:'Sacramento',    state:'CA', stateName:'California',   lat:38.5816,  lng:-121.4944, tz:'America/Los_Angeles', neighborhoods:['Midtown','East Sacramento','Roseville','Folsom','Natomas'] },
  { slug:'kansas-city-mo',   name:'Kansas City',   state:'MO', stateName:'Missouri',     lat:39.0997,  lng:-94.5786,  tz:'America/Chicago',   neighborhoods:['Country Club Plaza','Westport','Overland Park','River Market','Brookside'] },
  { slug:'atlanta-ga',       name:'Atlanta',       state:'GA', stateName:'Georgia',      lat:33.7490,  lng:-84.3880,  tz:'America/New_York',  neighborhoods:['Midtown','Buckhead','Decatur','Sandy Springs','Old Fourth Ward'] },
  { slug:'miami-fl',         name:'Miami',         state:'FL', stateName:'Florida',      lat:25.7617,  lng:-80.1918,  tz:'America/New_York',  neighborhoods:['Brickell','Coral Gables','Wynwood','Miami Beach','Doral'] },
  { slug:'tampa-fl',         name:'Tampa',         state:'FL', stateName:'Florida',      lat:27.9506,  lng:-82.4572,  tz:'America/New_York',  neighborhoods:['Ybor City','Hyde Park','Westshore','Brandon','Carrollwood'] },
  { slug:'orlando-fl',       name:'Orlando',       state:'FL', stateName:'Florida',      lat:28.5383,  lng:-81.3792,  tz:'America/New_York',  neighborhoods:['Winter Park','Lake Nona','Dr. Phillips','Baldwin Park','Altamonte Springs'] },
  { slug:'cleveland-oh',     name:'Cleveland',     state:'OH', stateName:'Ohio',         lat:41.4993,  lng:-81.6944,  tz:'America/New_York',  neighborhoods:['Ohio City','Tremont','Lakewood','University Circle','Shaker Heights'] },
  { slug:'pittsburgh-pa',    name:'Pittsburgh',    state:'PA', stateName:'Pennsylvania', lat:40.4406,  lng:-79.9959,  tz:'America/New_York',  neighborhoods:['Shadyside','Lawrenceville','Squirrel Hill','South Side','Oakland'] },
  { slug:'cincinnati-oh',    name:'Cincinnati',    state:'OH', stateName:'Ohio',         lat:39.1031,  lng:-84.5120,  tz:'America/New_York',  neighborhoods:['Over-the-Rhine','Hyde Park','Mason','Clifton','Blue Ash'] },
  { slug:'st-louis-mo',      name:'St. Louis',     state:'MO', stateName:'Missouri',     lat:38.6270,  lng:-90.1994,  tz:'America/Chicago',   neighborhoods:['Central West End','Soulard','Clayton','The Hill','Kirkwood'] },
  { slug:'minneapolis-mn',   name:'Minneapolis',   state:'MN', stateName:'Minnesota',    lat:44.9778,  lng:-93.2650,  tz:'America/Chicago',   neighborhoods:['Uptown','North Loop','St. Paul','Edina','Northeast'] },
  { slug:'raleigh-nc',       name:'Raleigh',       state:'NC', stateName:'North Carolina', lat:35.7796, lng:-78.6382, tz:'America/New_York',  neighborhoods:['Downtown','North Hills','Cary','Durham','Wake Forest'] },
  { slug:'omaha-ne',         name:'Omaha',         state:'NE', stateName:'Nebraska',     lat:41.2565,  lng:-95.9345,  tz:'America/Chicago',   neighborhoods:['Old Market','Dundee','Benson','Papillion','Millard'] },
  { slug:'tulsa-ok',         name:'Tulsa',         state:'OK', stateName:'Oklahoma',     lat:36.1540,  lng:-95.9928,  tz:'America/Chicago',   neighborhoods:['Brookside','Cherry Street','Broken Arrow','Jenks','Midtown'] },
  { slug:'arlington-tx',     name:'Arlington',     state:'TX', stateName:'Texas',        lat:32.7357,  lng:-97.1081,  tz:'America/Chicago',   neighborhoods:['Entertainment District','North Arlington','Pantego','Mansfield','Grand Prairie'] },
  { slug:'wichita-ks',       name:'Wichita',       state:'KS', stateName:'Kansas',       lat:37.6872,  lng:-97.3301,  tz:'America/Chicago',   neighborhoods:['Old Town','Delano','Riverside','Derby','Andover'] },
  { slug:'new-orleans-la',   name:'New Orleans',   state:'LA', stateName:'Louisiana',    lat:29.9511,  lng:-90.0715,  tz:'America/Chicago',   neighborhoods:['French Quarter','Garden District','Uptown','Metairie','Marigny'] },
  { slug:'honolulu-hi',      name:'Honolulu',      state:'HI', stateName:'Hawaii',       lat:21.3069,  lng:-157.8583, tz:'Pacific/Honolulu',  neighborhoods:['Waikiki','Kakaako','Manoa','Kailua','Pearl City'] },
  { slug:'anchorage-ak',     name:'Anchorage',     state:'AK', stateName:'Alaska',       lat:61.2181,  lng:-149.9003, tz:'America/Anchorage', neighborhoods:['Downtown','Midtown','Eagle River','Spenard','Hillside'] },
];

export const getCity = (slug) => CITIES.find((c) => c.slug === slug);
