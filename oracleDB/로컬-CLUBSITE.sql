
DROP TABLE basket CASCADE CONSTRAINTS;
DROP TABLE group_morak CASCADE CONSTRAINTS;
DROP TABLE comments CASCADE CONSTRAINTS;
DROP TABLE member_group CASCADE CONSTRAINTS;
DROP TABLE review CASCADE CONSTRAINTS;
DROP TABLE member CASCADE CONSTRAINTS;
DROP TABLE notification CASCADE CONSTRAINTS;
DROP TABLE notice CASCADE CONSTRAINTS;
DROP TABLE faq CASCADE CONSTRAINTS;
DROP TABLE messages CASCADE CONSTRAINTS;
DROP TABLE visit_log CASCADE CONSTRAINTS;
DROP TABLE report CASCADE CONSTRAINTS;
DROP TABLE transaction_log CASCADE CONSTRAINTS;


create sequence basket_seq 
start with 1 
increment by 1;

create sequence group_seq 
start with 1 
increment by 1;

create sequence comments_seq 
start with 1 
increment by 1;

create sequence member_group_seq 
start with 1 
increment by 1;

create sequence group_info_seq 
start with 1 
increment by 1;

create sequence review_seq 
start with 1 
increment by 1;

create sequence member_seq 
start with 1 
increment by 1;

create sequence notification_seq 
start with 1 
increment by 1;

create sequence notice_seq 
start with 1 
increment by 1;

create sequence faq_seq 
start with 1 
increment by 1;

create sequence charge_seq 
start with 1 
increment by 1;

create sequence messages_seq 
start with 1 
increment by 1;

create sequence visit_seq
start with 1
increment by 1;

create sequence transaction_seq
start with 1
increment by 1;

create sequence report_seq
start with 1
increment by 1;

create sequence notification_seq
start with 1
increment by 1;
-- 모임장바구니

create table basket(
    basket_no number(6) not null,
    no number(6) not null,
    group_no number(6) not null,
    price number(6),                    --비용
    reg_date date default sysdate,       --신청일
    start_date date,                     --모임시작일
    last_date date,                      --모임종료일
    primary key(basket_no)
);
ALTER TABLE BASKET
ADD CONSTRAINT unique_basket UNIQUE (NO, GROUP_NO);

-- 모임
create table group_morak(
    group_no number(6) not null,
    no number(6) not null,              --모임장
    group_title varchar2(100),                --모임명
    reg_date date default sysdate,       --개설일
    category varchar2(50),                 --카테고리
    user_max number(3),                 --최대모임원
    price number(6),                    --비용
    area varchar2(50),                  --모임구역
    addr1 varchar2(100),              --일반주소
    addr2 varchar2(100),       --상세주소
    latitude varchar2(30),              --위도
    longitude varchar2(30),             --경도
    start_date date,                     --모임시작일
    last_date date,                      --모임종료일
    comment1 varchar2(500),             --자기PR
    comment2 varchar2(1000),             --모임소개글 
    approval varchar2(20) DEFAULT 'N',                --관리자 승인여부
    views number(6),                    --조회수
     img_url1 varchar2(100),               --이미지1
    img_url2 varchar2(100),               --이미지2
    img_url3 varchar2(100),               --이미지3
    type varchar2(20),                   --정기모임,소모임 구분
    primary key(group_no)
);


-- 댓글(답변형)
create table comments(
    comments_no number(6) not null,
    no number(6) not null,
    review_no number(6) not null,
    content varchar2(255),
    ref number(5,0) default 0,
    step number(3,0) default 0,
    depth number(3,0) default 0,
    num_ref number(7,0) default 0,
    nickname varchar2(50),               --닉네임
    reg_date date default sysdate,
    isblacked varchar2(10) default 'N',
    primary key(comments_no)
);



--멤버-그룹 조인테이블
create table member_group(
    member_group_no number(6),
    no number(6) not null,
    group_no number(6) not null,
    status varchar2(20),             --승인대기, 멤버, 모임장
    pr varchar2(500),
    primary key(member_group_no)
);
--같은 유저가 같은 모임 두번 신청 못하게 unique처리
ALTER TABLE MEMBER_GROUP
ADD CONSTRAINT UNIQUE_MEMBER_GROUP UNIQUE (NO, GROUP_NO);


-- 리뷰게시판
create table review(
    review_no number(6) not null,
    no number(6) not null,
    group_no number(6) not null,
    review_title varchar2(50),
    img_url varchar2(50),
    content varchar2(255),
    views number(6),                     --조회수
    comments number(4),                  --댓글수
    star number(1) default 0,            --별점
    category varchar2(50),     --카테고리
    reg_date DATE DEFAULT SYSDATE,
    isblacked varchar2(10) default 'N',
    primary key(review_no)

);


select * from member;
SELECT 
    gm.group_title,
    gm.start_date,
    gm.last_date,
    gm.price,
    mg.status
FROM member_group mg
JOIN group_morak gm ON mg.group_no = 72
WHERE mg.status != 'LEADER';
-- 사용자
create table member(
    no number(6) not null,
    role number(1) default 1,
    id varchar2(100),             -- 자체 회원가입 시 아이디
    pw varchar2(100),             --자체 회원가입 시 비밀번호
    email varchar2(100),
    provider varchar2(100)  default 'none',               --OAuth 제공자(google, naver 등)
    provider_id varchar2(100) default 'none',            --OAuth 제공자의 고유 아이디
    phone varchar2(20),
    name varchar2(20),
    nickname varchar2(50),               --닉네임
    birth date,
    gender varchar2(6),
    money number(10) default 0,          --소지금
    zip_code varchar2(10),
    addr1 varchar2(50),
    addr2 varchar2(50),
    star_sum number(6) default 0,        --별점총합
    black number(6) default 0,           --신고횟수
    reg_date date default sysdate,        --가입일
    img_url varchar2(255) default '',                 --사진
    self_pr varchar2(255) default '',               --자기소개
    primary key(no)
);
delete from member where gender='male';
INSERT INTO member (
    no, role, id, pw, provider, provider_id, name, nickname, email, phone, birth, gender, money, zip_code, addr1, addr2, 
    star_sum, black, reg_date, img_url, self_pr
) VALUES (
    0, 0, 'admin', '$2a$10$EwQe.UC5u9rocXERoF472eV2h6lsJ62l51FLq11kh58dKf82WbvXm', 
    'none', 'none', 'admin', 'admin', 
    'admin@example.com', '010-0000-0000', TO_DATE('1980-01-01', 'YYYY-MM-DD'), '여자', 
    100000, '12345', 'Seoul', 'Admin Street 1', 
    0, 0, SYSDATE, '', '관리자 계정입니다.'
);


-- 알림
create table notification(
    notification_no number(6) not null,
    no number(6) not null,
    content varchar2(255),
    is_read varchar2(1) default 'N',     --읽음여부
    reg_date date default sysdate,        --알림일
    primary key(notification_no)
);


-- 공지사항
create table notice(
    notice_no number(6) not null,
   notice_title varchar2(50),
    content varchar2(255),
    reg_date date default sysdate,
    primary key(notice_no)
);

-- FAQ
create table faq(
    faq_no number(6) not null,
    faq_title varchar2(50),
    reg_date date default sysdate,
    content varchar2(255),
    primary key(faq_no)
);

-- 채팅내역 DB 저장
CREATE TABLE messages (
    message_no number(6),
    sender VARCHAR2(100) NOT NULL,
    content CLOB NOT NULL,
    timestamp NUMBER NOT NULL,
    room_code VARCHAR2(50) NOT NULL,
    firebase_message_id VARCHAR2(255) UNIQUE,
    primary key(message_no)
);


----------신고테이블 최종본----------------------
create table report(
    rep_no number(6),
    reporter_no number(6),
    reported_no number(6),
    reason varchar2(255),
    rep_date date,
    rep_status varchar2(1) default 'N', -- 처리상태 (N => 처리전, Y=> 처리됨, P=>넘어감)
    primary key(rep_no)
);

-- 방문기록
create table visit_log(
    v_id number(6),
    ip varchar2(50),
    visit_date date default sysdate,
    visit_url varchar2(300),
    primary key(v_id)
    );


--거래내역 테이블
create table Transaction_log(
    transaction_no number(6),
    no number(6),
    type varchar2(100),
    amount number(7),
    reg_date date default sysdate,
    primary key(transaction_no)
);

    
--관리자
delete from member where gender='male';
INSERT INTO member (
    no, role, id, pw, provider, provider_id, name, nickname, email, phone, birth, gender, money, zip_code, addr1, addr2, 
    star_sum, black, reg_date, img_url, self_pr
) VALUES (
    0, 0, 'admin', '$2a$10$EwQe.UC5u9rocXERoF472eV2h6lsJ62l51FLq11kh58dKf82WbvXm', 
    'none', 'none', 'admin', 'admin', 
    'admin@example.com', '010-0000-0000', TO_DATE('1980-01-01', 'YYYY-MM-DD'), '여자', 
    100000, '12345', 'Seoul', 'Admin Street 1', 
    0, 0, SYSDATE, '', '관리자 계정입니다.'
);



select * from charge; 
SELECT TO_CHAR(reg_date, 'YYYY-MM-DD') AS transaction_date, -- 날짜 형식 변환
       SUM(amount) AS total_amount
FROM Transaction_log
GROUP BY TO_CHAR(reg_date, 'YYYY-MM-DD')
ORDER BY transaction_date;

SELECT gender, count(*) as count
		FROM MEMBER
		GROUP BY gender;
        
SELECT
		    CASE 
		        WHEN (FLOOR(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 10 AND 19) THEN '10대'
		        WHEN (FLOOR(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 20 AND 29) THEN '20대'
		        WHEN (FLOOR(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 30 AND 39) THEN '30대'
		        WHEN (FLOOR(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 40 AND 49) THEN '40대'
		        WHEN (FLOOR(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 50 AND 59) THEN '50대'
		        WHEN (FLOOR(MONTHS_BETWEEN(SYSDATE, birth) / 12) >= 60) THEN '60대 이상'
		        ELSE '기타'
		    END AS age_group,
		    COUNT(*) AS count
			FROM member;
            
SELECT g.group_no, count(*) AS count
		FROM member_group mg INNER JOIN group_morak g
		ON mg.member_group_no = g.group_no
		where mg.status = 'MEMBER' and g.approval= 'Y'
		GROUP BY g.group_no
		ORDER BY count DESC
        
       SELECT URL, COUNT(DISTINCT IP) AS count
		FROM VISIT_LOG
		WHERE URL LIKE '/GROUP/DETAIL%'
		GROUP BY URL
		ORDER BY visitor_count DESC;
        
        select * from group_morak;