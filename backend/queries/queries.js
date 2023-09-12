module.exports = {
    registerUser: (name, surname, email, hashedPassword) => {
      return `INSERT INTO users
                (name, surname, email, password, user_type) 
                  VALUES ('${name}', '${surname}', '${email}', '${hashedPassword}', 'user');`;
    },
    loginUser: (email, hashedPassword) => {
      return `SELECT id, user_type FROM users
                WHERE email = "${email}"
                  AND password = "${hashedPassword}";`;
    },
    addToken: (userId, token) => {
      return `INSERT INTO tokens
                (user_id, token)
                  VALUES
                    ("${userId}", "${token}")`;
    },
    identifyUserByToken: (token) => {
      return `SELECT user_id FROM tokens
                WHERE token = "${token}";`;
    },

    getUserProperties: (userId) => {
      return `SELECT id, created, name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, 
      development, gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, 
      futureRent, futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, brokerFee
        FROM property
          WHERE userId = ${userId};`;
    },
    getPropertyById: (id, userId) => {
      return `SELECT id, created, name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, 
      development, gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, 
      futureRent, futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, brokerFee,
      image
        FROM property
          WHERE id = ${id}
            AND userId = ${userId};`;
    },
    addProperty: (userId, name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, development,
      gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, futureRent,
      futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, brokerFee) => {
      return `INSERT INTO property
                (userId, name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, development, gdv,
                capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, 
                futureRent, futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, 
                brokerFee)
                  VALUES
                    ("${userId}", "${name}", "${street}", "${city}", "${postcode}", "${price}", "${ccy}", "${tenure}", "${groundRent}",
                    "${leaseholdTerm}", "${dealType}", "${development}", "${gdv}", "${capex}", "${units}", "${siteArea}", "${areaGross}",
                    "${areaNet}", "${futureAreaGross}", "${futureAreaNet}", "${passingRent}", "${opex}", "${passingNoi}", "${futureRent}", 
                    "${futureOpex}", "${futureNoi}", "${occupancy}", "${leaseBreak}", "${leaseExpiry}", "${assetClass}", "${futureAssetClass}", 
                    "${feeStructure}", "${brokerFee}")`;
    },
    updateProperty: (name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, development,
      gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, futureRent,
      futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, brokerFee, id, userId
      ) => {
      return `UPDATE property 
                SET name = "${name}", street="${street}", city = "${city}", postcode = "${postcode}", price = "${price}", 
                ccy = "${ccy}", tenure = "${tenure}", groundRent = "${groundRent}", leaseholdTerm = "${leaseholdTerm}", 
                dealType = "${dealType}", development = "${development}", gdv = "${gdv}", capex = "${capex}", units = "${units}",
                siteArea = "${siteArea}", areaGross = "${areaGross}", areaNet = "${areaNet}", futureAreaGross = "${futureAreaGross}",
                futureAreaNet = "${futureAreaNet}", passingRent = "${passingRent}", opex = "${opex}", passingNoi = "${passingNoi}", 
                futureRent = "${futureRent}", futureOpex = "${futureOpex}", futureNoi = "${futureNoi}", occupancy = "${occupancy}", 
                leaseBreak = "${leaseBreak}", leaseExpiry = "${leaseExpiry}", assetClass = "${assetClass}", 
                futureAssetClass = "${futureAssetClass}", feeStructure = "${feeStructure}", brokerFee = "${brokerFee}"
                  WHERE id = "${id}" AND userId = "${userId}";`;
    },  
    deleteProperty: (id, userId) => {
      return `DELETE FROM property
                WHERE id = ${id} AND userId = ${userId};`;
    },
    addImageProperty: (image, id, userId) => {
      return `UPDATE property
                SET image = "${image}"
                  WHERE id = ${id} AND userId = ${userId};`;
    },

    getUserContacts: (userId) => {
      return `SELECT id, created, name, surname, company, email, phone, contactDate, job, role, city
        FROM contacts
          WHERE userId = ${userId};`;
    },
    getContactById: (id, userId) => {
      return `SELECT id, created, name, surname, company, email, phone, contactDate, job, role, city 
                FROM contacts
                    WHERE id = ${id}
                      AND userId = ${userId}`;
    },
    addContact: (userId, name, surname, company, email, phone, contactDate, job, role, city) => {
      return `INSERT INTO contacts
                (userId, name, surname, company, email, phone, contactDate, job, role, city)
                  VALUES
                    ("${userId}", "${name}", "${surname}", "${company}", "${email}", "${phone}", "${contactDate}", "${job}", 
                    "${role}", "${city}");`;
    },
    updateContact: (name, surname, company, email, phone, contactDate, job, role, city, id, userId) => {
      return `UPDATE contacts
                SET name = "${name}", surname = "${surname}", company = "${company}", email = "${email}", phone = "${phone}", 
                contactDate = "${contactDate}", job = "${job}", role = "${role}", city = "${city}"
                  WHERE id = "${id}" AND userId = "${userId}";`;
    },  
    deleteContact: (id, userId) => {
      return `DELETE FROM contacts
                WHERE id = ${id} AND userId = ${userId};`;
    },

    getUserInvestors: (userId) => {
      return `SELECT id, created, investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, targetGeography, 
              minSize, maxSize, ccy, minWalb, maxWalb, minYield, contactId
                FROM investors
                  WHERE userId = ${userId};`;
    },
    getInvestorById: (id, userId) => {
      return `SELECT i.id, i.created, i.investorName, i.strategyName, i.assetClass, i.development, i.futureAssetClass, 
              i.targetDescription, i.targetGeography, i.minSize, i.maxSize, i.ccy, i.minWalb, i.maxWalb, i.minYield, i.contactId,
              c.name, c.surname, c.company, c.email, c.phone, c.contactDate, c.job, c.role, c.city
                FROM investors AS i, contacts AS c
                    WHERE i.id = ${id}
                      AND i.userId = ${userId}
                        AND c.id = i.contactId;`;
    },
    addInvestor: (userId, investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, targetGeography, 
      minSize, maxSize, ccy, minWalb, maxWalb, minYield, contactId
      ) => {
      return `INSERT INTO investors
                (userId, investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, targetGeography, 
                  minSize, maxSize, ccy, minWalb, maxWalb, minYield, contactId)
                  VALUES
                    ("${userId}", "${investorName}", "${strategyName}", "${assetClass}", "${development}", "${futureAssetClass}",
                    "${targetDescription}", "${targetGeography}", "${minSize}", "${maxSize}", "${ccy}", "${minWalb}", "${maxWalb}",
                    "${minYield}", "${contactId}");`;
    },
    updateInvestor: (investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, targetGeography, 
      minSize, maxSize, ccy, minWalb, maxWalb, minYield, contactId, id, userId
      ) => {
      return `UPDATE investors
                SET investorName = "${investorName}", strategyName="${strategyName}", assetClass = "${assetClass}",
                development = "${development}", futureAssetClass = "${futureAssetClass}", targetDescription = "${targetDescription}",
                targetGeography = "${targetGeography}", minSize = "${minSize}", maxSize = "${maxSize}", ccy = "${ccy}",
                minWalb = "${minWalb}", maxWalb = "${maxWalb}", minYield = "${minYield}", contactId = "${contactId}"
                  WHERE id = "${id}" AND userId = "${userId}";`;
    },  
    deleteInvestor: (id, userId) => {
      return `DELETE FROM investors
                WHERE id = ${id} AND userId = ${userId};`;
    },

    
    getBlog: () => {
      return `SELECT id, articleTopic, headline, articleDate, textBlock
                FROM blog
                  ORDER BY articleDate DESC;`; // Show the latest blog posts first
    },
    deleteBlogPost: (id) => {
      return `DELETE FROM blog
                WHERE id = ${id};`;
    },
    addBlogPost: (articleTopic, headline, textBlock) => {
      return `INSERT INTO blog
                          (articleTopic, headline, textBlock)
                            VALUES
                              ("${articleTopic}", "${headline}", "${textBlock}");`;
    },
    updateBlogPost: (articleTopic, headline, articleDate, textBlock, id) => {
      return `UPDATE blog 
                SET articleTopic = "${articleTopic}", headline="${headline}", articleDate="${articleDate}", textBlock="${textBlock}"
                  WHERE id = "${id}";`;
    }, 

    getUserStats: () => {
      return `SELECT u.id, u.name, u.surname, u.email, u.user_type, u.created,
                COUNT(DISTINCT p.created) AS properties, 
                COUNT (DISTINCT i.created) AS investors,
                COUNT (DISTINCT c.created) AS contacts
                  FROM users AS u 
                    LEFT JOIN property AS p ON u.id = p.userId
                    LEFT JOIN investors AS i ON u.id = i.userId
                    LEFT JOIN contacts AS c ON u.id = c.userId
                      GROUP BY u.id;`
    },
    getPropertyStats: () => {
      return `SELECT id, userId, created, name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, 
              development, gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, 
              passingNoi, futureRent, futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, 
              feeStructure, brokerFee, image
                FROM property;`;
    },
    getInvestorStats: () => {
      return `SELECT id, userId, created, investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, 
              targetGeography, minSize, maxSize, ccy, minWalb, maxWalb, minYield, contactId
                FROM investors;`;
    },
    getContactStats: () => {
      return `SELECT id, userId, created, name, surname, company, email, phone, contactDate, job, role, city
                FROM contacts;`;
    },

  };
  