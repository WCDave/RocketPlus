create user dave identified by manager42;
grant all privileges to dave;

CREATE SEQUENCE DAVE.PROVIDER_SEQ  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  NOORDER  NOCYCLE;
CREATE SEQUENCE DAVE.REQUEST_ITEM_DETAIL_SEQ  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  NOORDER  NOCYCLE;
CREATE SEQUENCE DAVE.REQUEST_ITEM_SEQ  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  NOORDER  NOCYCLE;
CREATE SEQUENCE DAVE.REQUEST_SEQ  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  NOORDER  NOCYCLE;
CREATE SEQUENCE DAVE.REQ_PROV_USE_SEQ  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  NOORDER  NOCYCLE;
CREATE SEQUENCE DAVE.USE_SEQ  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  NOORDER  NOCYCLE;

CREATE TABLE
    DAVE.PROVIDER
    (
        PID NUMBER NOT NULL,
        ID VARCHAR2(10),
        CONSTRAINT PK_PROVIDER PRIMARY KEY (PID)
    );    
    
CREATE TABLE
    DAVE.REQUEST
    (
        PID NUMBER NOT NULL,
        ID VARCHAR2(10),
        CONSTRAINT PK_REQUEST PRIMARY KEY (PID),
        CONSTRAINT UQ_ID UNIQUE (ID)
    );
    
CREATE TABLE
    DAVE.REQUEST_ITEM
    (
        PID NUMBER NOT NULL,
        REQ_PID NUMBER,
        CONSTRAINT PK_REQUEST_ITEM PRIMARY KEY (PID),
        CONSTRAINT FK_REQUEST FOREIGN KEY (REQ_PID) REFERENCES dave.REQUEST (PID)
    );
   
CREATE TABLE
    DAVE.REQUEST_ITEM_DETAIL
    (
        PID NUMBER NOT NULL,
        REQ_ITEM_PID NUMBER,
        CONSTRAINT PK_REQUEST_ITEM_DETAIL PRIMARY KEY (PID),
        CONSTRAINT FK_REQUEST_ITEM FOREIGN KEY (REQ_ITEM_PID) REFERENCES dave.REQUEST_ITEM (PID)
    );
    
CREATE TABLE
    DAVE.USE
    (
        PID NUMBER NOT NULL,
        CODE VARCHAR2(10),
        DESCR VARCHAR2(30),
        CONSTRAINT PK_USE PRIMARY KEY (PID)
    );
    
CREATE TABLE
    DAVE.REQ_PROV_USE
    (
        PID NUMBER NOT NULL,
        PARENT_OBJECT_PID NUMBER,
        PROV_PID NUMBER,
        USE_PID NUMBER,
        PARENT_DESCR CHAR(1),
        CONSTRAINT PK_RPU PRIMARY KEY (PID),
        CONSTRAINT FK_PROVIDER FOREIGN KEY (PROV_PID) REFERENCES dave.PROVIDER (PID),
        CONSTRAINT FK_USE FOREIGN KEY (USE_PID) REFERENCES dave.USE (PID),
        CONSTRAINT UQ_RPU UNIQUE (USE_PID, PARENT_DESCR, PARENT_OBJECT_PID),
        CONSTRAINT CK_PARENT_DESCR CHECK (parent_descr IN ('R',
                                                           'D'))
    );
    
CREATE TABLE
    DAVE.REQ_PROV_USE_PARENT
    (
        PID NUMBER,
        REQ_PROV_USE_PID NUMBER,
        REQ_PROV_USE_PARENT NUMBER,
        CONSTRAINT FK_RPU FOREIGN KEY (REQ_PROV_USE_PID) REFERENCES dave.REQ_PROV_USE (PID),
        CONSTRAINT FK_RPU_PARENT FOREIGN KEY (REQ_PROV_USE_PARENT) REFERENCES dave.REQ_PROV_USE (PID)
    );
    
insert into dave.PROVIDER (PID, ID) values (1, 'prov1');
insert into dave.PROVIDER (PID, ID) values (2, 'prov2');
insert into dave.PROVIDER (PID, ID) values (3, 'prov3');

insert into dave.USE (PID, CODE, DESCR) values (1, 'submit', null);
insert into dave.USE (PID, CODE, DESCR) values (2, 'service', null);
insert into dave.USE (PID, CODE, DESCR) values (3, 'attend', null);

    
   
 
