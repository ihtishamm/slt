/**
 * Route table for the one-time HTML -> Next.js migration.
 *
 * NOTE: the source pages these paths point at are no longer on disk. They are
 * preserved in _archive/legacy-sources.tar.gz — extract it at the repo root
 * before re-running any script in this folder:
 *
 *     tar xzf _archive/legacy-sources.tar.gz
 *
 * These tools are a record of how the app was generated. The pages in src/app
 * are now the source of truth and are edited directly.
 */
module.exports = [
  { file:'_archive/legacy-site/index.html',                              route:'/',                               slug:'home',                     css:'home',                     translator:'asl'  },
  { file:'_archive/legacy-site/about.html',                              route:'/about',                          slug:'about',                    css:'about',                    translator:null   },
  { file:'_archive/legacy-site/contact.html',                            route:'/contact',                        slug:'contact',                  css:'contact',                  translator:null   },
  { file:'_archive/legacy-site/privacy.html',                            route:'/privacy',                        slug:'privacy',                  css:'privacy',                  translator:null   },
  { file:'_archive/legacy-site/terms-and-condition.html',                route:'/terms-and-condition',            slug:'terms-and-condition',      css:'terms-and-condition',      translator:null   },
  { file:'_archive/legacy-site/sign-language-alphabet-in-spanish.html',  route:'/sign-language-alphabet-in-spanish',slug:'sign-language-alphabet-in-spanish',css:'sign-language-alphabet-in-spanish',translator:null },
  { file:'_archive/legacy-site/abc-in-sign-language/index.html',         route:'/abc-in-sign-language',           slug:'abc-in-sign-language',     css:'abc-in-sign-language',     translator:null   },
  { file:'_archive/legacy-site/baby-sign-language/index.html',           route:'/baby-sign-language',             slug:'baby-sign-language',       css:'baby-sign-language',       translator:null   },
  { file:'_archive/legacy-site/sign-language-alphabet/index.html',       route:'/sign-language-alphabet',         slug:'sign-language-alphabet',   css:'sign-language-alphabet',   translator:null   },
  { file:'_archive/legacy-site/sign-language-words/index.html',          route:'/sign-language-words',            slug:'sign-language-words',      css:'sign-language-words',      translator:null   },
  { file:'_archive/legacy-site/australian-sign-language/index.html',     route:'/australian-sign-language',       slug:'australian-sign-language', css:'australian-sign-language', translator:'auslan' },
  { file:'_archive/legacy-site/british-sign-language/index.html',        route:'/british-sign-language',          slug:'british-sign-language',    css:'british-sign-language',    translator:'bsl'  },
  { file:'_archive/legacy-site/chinese-sign-language/index.html',        route:'/chinese-sign-language',          slug:'chinese-sign-language',    css:'chinese-sign-language',    translator:'csl'  },
  { file:'_archive/legacy-site/french-sign-language/index.html',         route:'/french-sign-language',           slug:'french-sign-language',     css:'french-sign-language',     translator:'lsf'  },
  { file:'_archive/legacy-site/german-sign-language/index.html',         route:'/german-sign-language',           slug:'german-sign-language',     css:'german-sign-language',     translator:'dgs'  },
  { file:'_archive/legacy-site/japanese-sign-language/index.html',       route:'/japanese-sign-language',         slug:'japanese-sign-language',   css:'japanese-sign-language',   translator:null   },
  { file:'_archive/legacy-site/mexican-sign-language/index.html',        route:'/mexican-sign-language',          slug:'mexican-sign-language',    css:'mexican-sign-language',    translator:'lsm'  },
  { file:'_archive/legacy-site/spanish-sign-language/index.html',        route:'/spanish-sign-language',          slug:'spanish-sign-language',    css:'spanish-sign-language',    translator:'lse'  },
];
