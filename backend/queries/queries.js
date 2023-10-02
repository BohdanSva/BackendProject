module.exports = {
    identifyUserByEmail: () => {
      return `SELECT id FROM users
                WHERE email = ? ;`;
    },
    registerUser: () => {
      return `INSERT INTO users
                (name, surname, email, password, user_type) 
                  VALUES (?, ?, ?, ?, 'user');`;
    },
    loginUser: () => {
      return `SELECT id, user_type FROM users
                WHERE email = ?
                  AND password = ? ;`;
    },
    addToken: () => {
      return `INSERT INTO tokens
                (user_id, token)
                  VALUES
                    (?, ?)`;
    },
    identifyUserByToken: () => {
      return `SELECT user_id FROM tokens
                WHERE token = ? ;`;
    },
    deleteToken: () => {
      return `DELETE FROM tokens
                WHERE token = ? ;`;
    },

    getUserProperties: () => {
      return `SELECT id, created, name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, 
      development, gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, 
      futureRent, futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, brokerFee
        FROM property
          WHERE userId = ? ;`;
    },
    getPropertyById: () => {
      return `SELECT id, created, name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, 
      development, gdv, capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, 
      futureRent, futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, brokerFee,
      image
        FROM property
          WHERE id = ?
            AND userId = ? ;`;
    },
    addProperty: () => {
      return `INSERT INTO property
                (userId, name, street, city, postcode, price, ccy, tenure, groundRent, leaseholdTerm, dealType, development, gdv,
                capex, units, siteArea, areaGross, areaNet, futureAreaGross, futureAreaNet, passingRent, opex, passingNoi, 
                futureRent, futureOpex, futureNoi, occupancy, leaseBreak, leaseExpiry, assetClass, futureAssetClass, feeStructure, 
                brokerFee)
                  VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                    ?);`;
    },
    updateProperty: () => {
      return `UPDATE property 
                SET name = ?, street = ?, city = ?, postcode = ?, price = ?, 
                ccy = ?, tenure = ?, groundRent = ?, leaseholdTerm = ?, 
                dealType = ?, development = ?, gdv = ?, capex = ?, units = ?,
                siteArea = ?, areaGross = ?, areaNet = ?, futureAreaGross = ?,
                futureAreaNet = ?, passingRent = ?, opex = ?, passingNoi = ?, 
                futureRent = ?, futureOpex = ?, futureNoi = ?, occupancy = ?, 
                leaseBreak = ?, leaseExpiry = ?, assetClass = ?, 
                futureAssetClass = ?, feeStructure = ?, brokerFee = ?
                  WHERE id = ? AND userId = ?;`;
    },  
    deleteProperty: () => {
      return `DELETE FROM property
                WHERE id = ? AND userId = ? ;`;
    },
    addImageProperty: () => {
      return `UPDATE property
                SET image = ?
                  WHERE id = ? AND userId = ? ;`;
    },

    getUserContacts: () => {
      return `SELECT id, created, name, surname, company, email, phone, contactDate, job, role, city
        FROM contacts
          WHERE userId = ? ;`;
    },
    getContactById: () => {
      return `SELECT id, created, name, surname, company, email, phone, contactDate, job, role, city 
                FROM contacts
                    WHERE id = ?
                      AND userId = ? `;
    },
    addContact: () => {
      return `INSERT INTO contacts
                (userId, name, surname, company, email, phone, contactDate, job, role, city)
                  VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    },
    updateContact: () => {
      return `UPDATE contacts
                SET name = ?, surname = ?, company = ?, email = ?, phone = ?, 
                contactDate = ?, job = ?, role = ?, city = ?
                  WHERE id = ? AND userId = ? ;`;
    },  
    deleteContact: () => {
      return `DELETE FROM contacts
                WHERE id = ? AND userId = ? ;`;
    },

    getUserInvestors: () => {
      return `SELECT id, created, investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, targetGeography, 
              minSize, maxSize, ccy, minWalb, maxWalb, minYield, contactId
                FROM investors
                  WHERE userId = ? ;`;
    },
    getInvestorById: () => {
      return `SELECT i.id, i.created, i.investorName, i.strategyName, i.assetClass, i.development, i.futureAssetClass, 
              i.targetDescription, i.targetGeography, i.minSize, i.maxSize, i.ccy, i.minWalb, i.maxWalb, i.minYield, i.contactId,
              c.name, c.surname, c.company, c.email, c.phone, c.contactDate, c.job, c.role, c.city
                FROM investors AS i, contacts AS c
                    WHERE i.id = ?
                      AND i.userId = ?
                        AND c.id = i.contactId;`;
    },
    addInvestor: () => {
      return `INSERT INTO investors
                (userId, investorName, strategyName, assetClass, development, futureAssetClass, targetDescription, targetGeography, 
                  minSize, maxSize, ccy, minWalb, maxWalb, minYield, contactId)
                  VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    },
    updateInvestor: () => {
      return `UPDATE investors
                SET investorName = ?, strategyName=?, assetClass = ?,
                development = ?, futureAssetClass = ?, targetDescription = ?,
                targetGeography = ?, minSize = ?, maxSize = ?, ccy = ?,
                minWalb = ?, maxWalb = ?, minYield = ?, contactId = ?
                  WHERE id = ? AND userId = ? ;`;
    },  
    deleteInvestor: () => {
      return `DELETE FROM investors
                WHERE id = ? AND userId = ? ;`;
    },

    
    getBlog: () => {
      return `SELECT id, articleTopic, headline, articleDate, textBlock
                FROM blog
                  ORDER BY articleDate DESC;`; // Show the latest blog posts first
    },
    deleteBlogPost: () => {
      return `DELETE FROM blog
                WHERE id = ? ;`;
    },
    addBlogPost: () => {
      return `INSERT INTO blog
                          (articleTopic, headline, textBlock)
                            VALUES
                              (?, ?, ?);`;
    },
    updateBlogPost: () => {
      return `UPDATE blog 
                SET articleTopic = ?, headline=?, articleDate=?, textBlock=?
                  WHERE id = ? ;`;
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
  