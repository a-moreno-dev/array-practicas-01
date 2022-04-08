// Responsables de los cuarteles
const fieldManagers = [
  { id: 1, fieldNumber: '982546762', name: 'Fenildo Marmolejo Frias' },
  { id: 2, fieldNumber: '863838923', name: 'Henhelberto Fuste Hagamenon' },
  { id: 3, fieldNumber: '789032284', name: 'Silvina Fernandez Lora' },
  { id: 4, fieldNumber: '333225467', name: 'Castulo Poe Minorato' },
  { id: 5, fieldNumber: '111234152', name: 'Lastenia Rojas Del Porrazo' },
  { id: 6, fieldNumber: '583452110', name: 'Crespiladiao Sousa Chavez' }
];

// Tipo de cuartel, en el cual se utiliza el tipo de producto plantado
const fieldType = [
  { id: 1, name: 'Cevada' },
  { id: 2, name: 'Trigo' },
  { id: 3, name: 'Arroz' },
  { id: 4, name: 'Maiz' }
]

/*
// Un paddock representa un cuartel de un campo (Entiéndase también como potrero o parcela), 
el área está representada en m2, harvestTime es el año en el que se sembró el cuartel
*/
const paddocks = [
  { fieldManagerId: 1, farmId: 3, fieldTypeId: 4, harvestTime: 2019, area: 150083 },
  { fieldManagerId: 1, farmId: 2, fieldTypeId: 1, harvestTime: 2019, area: 1795836 },
  { fieldManagerId: 1, farmId: 3, fieldTypeId: 1, harvestTime: 2022, area: 11048320 },
  { fieldManagerId: 2, farmId: 1, fieldTypeId: 3, harvestTime: 2019, area: 11188345 },
  { fieldManagerId: 2, farmId: 2, fieldTypeId: 2, harvestTime: 2018, area: 11678350 },
  { fieldManagerId: 2, farmId: 3, fieldTypeId: 3, harvestTime: 2020, area: 1296835 },
  { fieldManagerId: 2, farmId: 2, fieldTypeId: 3, harvestTime: 2021, area: 1840831 },
  { fieldManagerId: 2, farmId: 3, fieldTypeId: 3, harvestTime: 2021, area: 130083 },
  { fieldManagerId: 3, farmId: 1, fieldTypeId: 1, harvestTime: 2019, area: 11718337 },
  { fieldManagerId: 3, farmId: 3, fieldTypeId: 2, harvestTime: 2018, area: 1173836 },
  { fieldManagerId: 3, farmId: 2, fieldTypeId: 2, harvestTime: 2020, area: 11918388 },
  { fieldManagerId: 3, farmId: 1, fieldTypeId: 1, harvestTime: 2020, area: 1287837 },
  { fieldManagerId: 4, farmId: 3, fieldTypeId: 4, harvestTime: 2018, area: 1165831 },
  { fieldManagerId: 4, farmId: 3, fieldTypeId: 2, harvestTime: 2020, area: 110083 },
  { fieldManagerId: 5, farmId: 1, fieldTypeId: 1, harvestTime: 2018, area: 170083 },
  { fieldManagerId: 5, farmId: 3, fieldTypeId: 2, harvestTime: 2020, area: 12008300 },
  { fieldManagerId: 5, farmId: 2, fieldTypeId: 1, harvestTime: 2018, area: 11598369 },
  { fieldManagerId: 5, farmId: 2, fieldTypeId: 3, harvestTime: 2010, area: 1320830 },
  { fieldManagerId: 5, farmId: 2, fieldTypeId: 2, harvestTime: 2017, area: 11598302 },
  { fieldManagerId: 5, farmId: 3, fieldTypeId: 2, harvestTime: 2020, area: 1374835 },
  { fieldManagerId: 6, farmId: 1, fieldTypeId: 2, harvestTime: 2012, area: 11058387 },
  { fieldManagerId: 6, farmId: 1, fieldTypeId: 1, harvestTime: 2019, area: 1120830 },
  { fieldManagerId: 6, farmId: 1, fieldTypeId: 3, harvestTime: 2021, area: 11138362 }
];

const farms = [
  { id: 1, name: 'Agricola Los Almendros' },
  { id: 2, name: 'Agricola Las Lajas' },
  { id: 3, name: 'Agricola Las Tortillas' }
];

// Arreglo con los ids de los managers de cada campo
function listfieldManagerIds() {
  return fieldManagers.map((paddockManager) => paddockManager.id);
};

// Arreglo con los fieldNumber de los responsables de 
// los campos ordenados por nombre
function listfieldManagersByName() {
  return fieldManagers
    .sort((prev, next) => {
      if (prev.name > next.name) return 1;
      if (prev.name < next.name) return -1;
      return 0;
    })
    .flatMap(manager => [manager.fieldNumber])
};

// 2 Arreglo con los nombres de cada tipo de cultivo, ordenados 
// decrecientemente por la suma TOTAL de la cantidad de hectáreas 
// plantadas de cada uno de ellos.
function sortfieldTypeByTotalArea() {
  const arrayfieldTypeByTotalAreaDec = [];
  for (const type of fieldType) {
    let totalEctareas = paddocks
      .filter(paddock => paddock.fieldTypeId === type.id)
      .flatMap(paddock => [paddock.area])
      .reduce((prev, next) => prev + next)
    arrayfieldTypeByTotalAreaDec.push(type.name)
  }
  return arrayfieldTypeByTotalAreaDec
    .sort((prevManager, nextManager) => {
      return nextManager.area - prevManager.area
    })
}

// Arreglo con los nombres de los managers, ordenados 
// decrecientemente por la suma TOTAL de hectáreas que administran.
function sortFarmManagerByAdminArea() {
  const arrayManagerNamesDec = [];
  for (const paddockManager of fieldManagers) {
    let area = paddocks
      .filter(paddock => paddock.fieldManagerId === paddockManager.id)
      .flatMap(paddock => [paddock.area])
      .reduce((prev, next) => prev + next)
    arrayManagerNamesDec.push({ name: paddockManager.name, area })
  }
  return arrayManagerNamesDec
    .sort((prevManager, nextManager) => {
      return nextManager.area - prevManager.area
    })
    .map(manager => manager.name);
}

// Objeto en que las claves sean los nombres de los campos y 
// los valores un arreglo con los ids de sus administradores 
// ordenados alfabéticamente por nombre.
function farmManagerNames() {
  // CODE HERE
  const farmsObjects = {}
  for (const paddock of paddocks) {
    const farm = farms.find(farm => (farm.id === paddock.farmId))
    const managersIndexFiltered = paddocks
      .filter(pdk => (farm.id === pdk.farmId))
      .map(pdk => pdk.fieldManagerId)
    const managers = fieldManagers
      .filter(manager => managersIndexFiltered
        .includes(manager.id))
      .map(manager => manager.fieldNumber)
    farmsObjects[farm.name] = managers.sort()
  }
  return farmsObjects
}


// Arreglo ordenado decrecientemente con los metros cuadrados totales 
// de cada campo que tengan más de 2 hectáreas en Cevada
function biggestAvocadoFarms() {
  const _fieldType = fieldType.find(type => type.name === 'Cevada')
  const _CevadaPaddocks = paddocks
    .filter(paddock => paddock.fieldTypeId === _fieldType.id)
    .map(({ farmId, area }) => ({ farmId, area }))
    .sort((prev, next) => {
      if (prev.farmId > next.farmId) return 1;
      if (prev.farmId < next.farmId) return -1;
      return 0;
    })
  const farmsIndexArray = []
  const farmsPaddockTotalAreas = []
  for (const paddock of _CevadaPaddocks) {
    const farm = farms.find(farm => (farm.id === paddock.farmId))
    const areas = _CevadaPaddocks.filter(pd => pd.farmId === farm.id).map(x => x.area)
    const total = 0
    if (!farmsIndexArray.includes(farm.id)) {
      const totalArea = areas.reduce((prev, curr) => prev + curr, total);
      farmsPaddockTotalAreas.push(totalArea)
      farmsIndexArray.push(farm.id)
    }
  }
  return farmsPaddockTotalAreas.sort().reverse()
}

// Arreglo con nombres de los administradores de la Agricola Las Tortillas
// , ordenados por nombre, que trabajen más de 1000 m2 de Arroz
function biggestCherriesManagers() {
  const farm = farms.find(farm => farm.name === 'Agricola Las Tortillas')
  const _fieldType = fieldType.find(type => type.name === 'Arroz')
  const managers = paddocks
    .filter(paddock => (paddock.farmId === farm.id && paddock.fieldTypeId === _fieldType.id))
    .sort((prev, next) => {
      if (prev.fieldManagerId > next.fieldManagerId) return 1;
      if (prev.fieldManagerId < next.fieldManagerId) return -1;
      return 0;
    })

  const managersFarmsTotalAreas = []
  const managersIndexArray = []
  for (const manager of managers) {
    const area = managers
      .filter(({ fieldManagerId }) => fieldManagerId === manager.fieldManagerId)
      .reduce((prev, next) => prev.area + next.area)
    if (!managersIndexArray.includes(manager.fieldManagerId) && area > 1000) {
      const paddockManager = fieldManagers.find(({ id }) => id === manager.fieldManagerId)
      managersFarmsTotalAreas.push(paddockManager.name)
      managersIndexArray.push(manager.fieldManagerId)
    }

  }
  return managersFarmsTotalAreas.sort()
}

// Objeto en el cual las claves sean el nombre del manager 
// y el valor un arreglo con los nombres de los campos que administra, 
// ordenados alfabéticamente
function farmManagerPaddocks() {
  const managersIndexArray = []
  const managersNamesObject = {}
  const managerNames = fieldManagers.map(({ name }) => name)
  for (const paddock of paddocks) {
    if (!managersIndexArray.includes(paddock.fieldManagerId)) {
      let fieldTypes = paddocks
        .filter(({ fieldManagerId }) => fieldManagerId === paddock.fieldManagerId)
        .map(manager => manager.fieldTypeId)
      fieldTypes = [...new Set(fieldTypes)]
      const fieldTypesNames = fieldType.flatMap(pt => fieldTypes.includes(pt.id) ? pt.name : [])
      managersNamesObject[managerNames[paddock.fieldManagerId - 1]] = fieldTypesNames.sort()
      managersIndexArray.push(paddock.fieldManagerId)
    }
  }
  return managersNamesObject;
}


// Objeto en que las claves sean el tipo de cultivo concatenado 
// con su año de plantación (la concatenación tiene un separador de guión ‘-’, 
// por ejemplo Trigo-2020) y el valor otro objeto en el cual la clave sea
// el id del administrador y el valor el nombre del administrador
function paddocksManagers() {
  const paddocksAndManager = []
  const managerNames = fieldManagers.map(({ id, name }) => ({ [id]: name }))
  const fieldTypesNames = fieldType.map(({ name }) => name)
  paddocks.map(paddock => {
    const managers = [...new Set(
      paddocks.flatMap(pdk => pdk.fieldTypeId === paddock.fieldTypeId ? pdk.fieldManagerId : [])
    )
    ]
    const name = `${fieldTypesNames[paddock.fieldTypeId - 1]}-//${paddock.harvestTime}`
    //const manager = managerNames.flatMap((manager, index) => managers.includes(index) ? manager : [])
    const manager = managerNames[paddock.fieldManagerId-1]
    paddocksAndManager.push({ [name]: manager })
  })
  return paddocksAndManager
}
// Agregar nuevo administrador con datos ficticios a "fieldManagers" y 
// agregar un nuevo cuartel de tipo Maiz con 900mts2, año 2017 
// de Agricola Los Almendros, administrado por este nuevo administrador 
// Luego devolver el lugar que ocupa este nuevo administrador en el 
// ranking de la pregunta 3.
// No modificar arreglos originales para no alterar las respuestas 
// anteriores al correr la solución
function newManagerRanking() {
  const _fieldManagers = [...fieldManagers]
  const newPaddockManager =
    { id: 7, fieldNumber: '666747474', name: 'ELEUTERIO ENHELBERTINO CUESTA' };
  _fieldManagers.push(newPaddockManager);
  const newPaddocks =
    { fieldManagerId: 7, farmId: 1, fieldTypeId: 4, harvestTime: 2017, area: 900 }
  return _fieldManagers
}

console.log("listfieldManagerIds");
console.table(listfieldManagerIds())

console.log("listfieldManagersByName");
console.table(listfieldManagersByName())

console.log("sortfieldTypeByTotalArea");
console.table(sortfieldTypeByTotalArea())

console.log("sortFarmManagerByAdminArea");
console.table(sortFarmManagerByAdminArea())

console.log("farmManagerNames");
console.table(farmManagerNames())

console.log("biggestAvocadoFarms");
console.table(biggestAvocadoFarms())

console.log("biggestCherriesManagers");
console.table(biggestCherriesManagers())

console.log("farmManagerPaddocks");
console.log(farmManagerPaddocks())

console.log("paddocksManagers");
console.log(paddocksManagers())

console.log("newManagerRanking");
console.table(newManagerRanking())