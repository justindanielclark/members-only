export default function reduceCrew(arr: Array<CrewCredit>): Array<ExpandedCrewCredit> {
  //CONVERT CREW ARRAY INTO A MAP WHERE EACH INDIVIDUAL IS ONLY A SINGLE ITEM, ORDERING BY PLACEMENT IN CREW ARRAY
  const modifiedCrewMap = arr.reduce((acc, cur, i) => {
    const lookup = acc.get(cur.name);
    //There Is No Entry Yet
    if (lookup == undefined) {
      const modifiedEntry: ExpandedCrewCredit = {
        ...cur,
        jobs: [cur.job],
      };
      acc.set(cur.name, { order: i, credit: modifiedEntry });
    }
    //There Exists An Entry
    else {
      const modifiedEntry: ExpandedCrewCredit = {
        ...lookup.credit,
        jobs: [...lookup.credit.jobs, cur.job],
      };
      acc.set(cur.name, { order: i < lookup.order ? i : lookup.order, credit: modifiedEntry });
    }
    return acc;
  }, new Map<string /* name of person */, { order: number /* their highest ranking on crew billing */; credit: ExpandedCrewCredit }>());

  const expandedCrewArray = Array.from(modifiedCrewMap.values())
    .sort((a, b) => {
      return a.order - b.order;
    })
    .reduce((acc, cur) => {
      acc.push(cur.credit);
      return acc;
    }, [] as Array<ExpandedCrewCredit>);

  return expandedCrewArray;
}
