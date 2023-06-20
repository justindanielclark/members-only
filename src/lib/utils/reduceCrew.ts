export default function reduceCrew(arr: Array<CrewCredit>): Array<ExpandedCrewCredit> {
  //CONVERT CREW ARRAY INTO A MAP WHERE EACH INDIVIDUAL IS ONLY A SINGLE ITEM, ORDERING BY PLACEMENT IN CREW ARRAY
  const modifiedCrewMap = arr.reduce((acc, cur, i) => {
    const lookup = acc.get(cur.name);
    //There Is No Entry Yet
    if (lookup == undefined) {
      const modifiedEntry: ExpandedCrewCredit & { job: string } = {
        ...cur,
        jobScore: calculateJobScore(cur.job),
        jobs: [cur.job],
      };
      acc.set(cur.name, modifiedEntry);
    }
    //There Exists An Entry
    else {
      const modifiedEntry: ExpandedCrewCredit = {
        ...lookup,
        jobs: [...lookup.jobs, cur.job],
        jobScore: lookup.jobScore + calculateJobScore(cur.job),
      };
      acc.set(cur.name, modifiedEntry);
    }
    return acc;
  }, new Map<string /* name of person */, ExpandedCrewCredit>());

  const expandedCrewArray = Array.from(modifiedCrewMap.values()).sort((a, b) => {
    return b.jobScore - a.jobScore;
  });
  return expandedCrewArray;
}

function calculateJobScore(job: string): number {
  switch (job.toLowerCase()) {
    case "director": {
      return 200;
    }
    case "original story": {
      return 100;
    }
    case "screenplay": {
      return 50;
    }
    case "writer": {
      return 50;
    }
    case "story": {
      return 8;
    }
    case "executive producer": {
      return 30;
    }
    case "producer": {
      return 20;
    }
    case "director of photography": {
      return 10;
    }
    case "original music composer": {
      return 7;
    }
    case "casting": {
      return 5;
    }
    case "script": {
      return 4;
    }
    case "characters": {
      return 4;
    }
    case "editor": {
      return 3;
    }
    case "production manager": {
      return 2;
    }
  }
  return 1;
}
