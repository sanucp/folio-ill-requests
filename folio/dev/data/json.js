async componentDidMount() {
    const params = queryString.parse(location.search);
    //console.log(params);
    if (params.confg) {
      const u = params.u;
      const t = params.t;
      const us = params.us;
      const p = params.p;
      const conf = params.confg;
      const nj = {
        folio_url: u,
        folio_tenandid: t,
        folio_user: us,
        folio_pass: p,
      };

      sessionStorage.setItem(conf, JSON.stringify(nj));

      //console.log(id);
    }
  }